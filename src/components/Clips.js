import React, { Component } from 'react';
import firebase from 'firebase/app';
import axios from 'axios';
import Spinner from './Spinner';
import "../styles/components/clips.scss";
import Button from './Button';


class Clips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            prompt: "",
            clipData: [],
            saveButtonDisabled: false,
            isSettingScrollerClips: false,
            isSettingMainClip: false,
            isAddingClip: false,
            isRemovingClip: false,
            editingClipUrl: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            isLoading: true
        });
        axios.get("/clips").then((clipData) => {
            console.log("clips from axios = ", clipData);
            this.setState({
                clipData: clipData.data
            })
        }).finally(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    setSaveButtonDisabled = () => {
        // TODO -> Will be based off the selected images count
    }

    onSetIsScrollerClip = (clip) => {
        const isScrollerClip = clip.isScrollerClip;
        const isAssigning = !isScrollerClip;

        if (isAssigning) {
            const newClipArray = this.state.clipData.map((clip) => {
                if (!clip.isScrollerClip) {
                    clip.imgClass = "dim"
                    return clip
                } else return clip
            });

            this.setState({
                clipData: newClipArray,
                prompt: "Select the clip to replace"
            });
        } else {
            const newClipArray = this.state.clipData.map((clip) => {
                if (clip.isScrollerClip || clip.isMainScrollerClip) {
                    clip.imgClass = "dim"
                    return clip
                } else return clip
            });

            this.setState({
                clipData: newClipArray,
                prompt: "Select the clip to replace"
            });
        }

        this.setState({
            isSettingScrollerClips: true,
            editingClipUrl: clip.clipUrl
        });
    };

    onSetMainClip = (clipArg) => {
        const isSettingAsMain = !clipArg.isMainScrollerClip;
        const clipData = this.state.clipData;
        const mainClip = clipData.find(clip => clip.isMainScrollerClip === true);

        if (!isSettingAsMain) {
            mainClip.imgClass = "dim";
            this.setState({
                prompt: "Select the main clip you want to use.",
                isSettingMainClip: true
            });
            return;
        }

        mainClip.isMainScrollerClip = false;
        clipArg.isMainScrollerClip = true;

        this.setState({
            clipData
        });
    }

    onSwitchMainClip = (clip) => {
        const selectedIsScrollerClip = clip.isScrollerClip;
        const clipData = this.state.clipData;
        const currentMainClip = clipData.find(c => c.isMainScrollerClip);
        currentMainClip.isMainScrollerClip = false;
        currentMainClip.imgClass = "";
        clip.isMainScrollerClip = true;

        if(selectedIsScrollerClip) {
            currentMainClip.isScrollerClip = true;
            clip.isScrollerClip = false;
        }

        this.setState({
            clipData,
            prompt: "",
            isSettingMainClip: false
        });
    }

    onReplaceClip = (clip) => {
        const newClipArray = this.state.clipData.map((i) => {
            if (i.clipUrl === this.state.editingClipUrl) {
                i.isScrollerClip = !i.isScrollerClip;
            }
            if (i.clipUrl === clip.clipUrl) {
                i.isScrollerClip = !i.isScrollerClip
            }
            i.imgClass = "";

            return i;
        });

        this.setState({
            clipData: newClipArray,
            isSettingScrollerClips: false,
            prompt: "",
            editingClipUrl: ""
        });
    }

    onCancelSettingScrollerClips = () => {
        if(this.state.isSettingScrollerClips) {
            this.setState({
                isSettingScrollerClips: false,
                clipData: this.state.clipData.map((clip) => {
                    clip.imgClass = "";
                    return clip;
                }),
                prompt: "",
                editingClipUrl: ""
            });
        } else if (this.state.isSettingMainClip) {
            const clipData = this.state.clipData;
            const mainClip = clipData.find(clip => clip.isMainScrollerClip);
            mainClip.imgClass = "";

            this.setState({
                isSettingMainClip: false,
                clipData,
                prompt: "",
            });
        }
    }

    render() {

        return (
            <div className="clips-page">
                {!this.state.isLoading ?
                    <div className="clip-actions">
                        <p>
                            {this.state.prompt}
                        </p>
                        <div className="clip-buttons">

                            <Button text="Save" disabled={this.state.saveButtonDisabled} />
                            {this.state.isSettingScrollerClips || this.state.isSettingMainClip ? <Button text="Cancel" clickHandler={this.onCancelSettingScrollerClips} /> : null}
                        </div>
                    </div>
                    : null}

                {this.state.isLoading ?
                    <Spinner height="100px" width="100px" marginTop="200px" /> :
                    <div className="clip-images">
                        {this.state.clipData.map((clip, index) => {
                            return (
                                <div key={index} className="clip-card">
                                    {/* {TODO -> Only display the indicator if its in the scroller} */}
                                    {clip.isScrollerClip ? <div className={`clip-card-indicator ${clip.imgClass}`}></div> : null}
                                    {clip.isMainScrollerClip ? <div className={`clip-card-indicator main ${clip.imgClass}`}></div> : null}
                                    {clip.imgClass !== "dim" ?
                                        <div className="hidden-clip-options">
                                            {
                                                this.state.isSettingScrollerClips ?
                                                    <p onClick={this.onReplaceClip.bind(this, clip)}>Replace with this clip</p>

                                                    : <div>
                                                        {
                                                            !this.state.isSettingMainClip ? 
                                                            <div>
                                                                {!clip.isMainScrollerClip ? <p onClick={this.onSetIsScrollerClip.bind(this, clip)}>{clip.isScrollerClip ? "Remove from scroller" : "Add to scroller"}</p> : null}
                                                                <p onClick={this.onSetMainClip.bind(this, clip)}>{clip.isMainScrollerClip ? "Unmark as main clip" : "Set as main clip in scroller"}</p>
                                                            </div>
                                                            : null
                                                        }
                                                    </div>
                                            }
                                            {
                                                this.state.isSettingMainClip ?
                                                    <p onClick={this.onSwitchMainClip.bind(this, clip)}>Replace with this clip</p>

                                                    : null

                                            }
                                        </div>
                                        : null}
                                    <img src={clip.thumbnailUrl} className={clip.imgClass} />
                                    <p>{clip.clipTitle}</p>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default Clips;