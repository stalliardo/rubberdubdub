import React, { Component } from 'react';
import firebase from 'firebase/app';
import axios from 'axios';
import Spinner from './Spinner';
import "../styles/components/clips.scss";
import Button from './Button';

class Clips extends Component {
    defaultState = {
        clipData: []
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            prompt: "",
            clipData: this.defaultState.clipData,
            saveButtonDisabled: false,
            isSettingScrollerClips: false,
            isSettingMainClip: false,
            isAddingClip: false,
            isRemovingClip: false,
            editingClipUrl: "",
        }
    }

    componentDidMount = () => {
        console.log("did mount called");
        this.setState({
            isLoading: true
        });
        axios.get("/clips").then((cData) => {
            const dataFromAxios = cData.data;
            console.log("data from axios = ", dataFromAxios);
            this.defaultState.clipData = dataFromAxios

            this.setState({
                clipData: dataFromAxios
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

    onSaveClicked = () => {
        const clipData = [...this.state.clipData];
        const mainclipUrl = clipData.find(clip => clip.isMainScrollerClip).clipUrl;
        const scrollerUrls = clipData.filter(clip => clip.isScrollerClip).map((i) => {
            return i.clipUrl
        });

        const clipObject = {
            main: mainclipUrl,
            scrollerUrls
        }

        axios.post("/scrollerClips", clipObject).then((response) => {
            console.log("respnise from sending the clip onject to the backend = ", response);
        }).catch((error) => {
            console.log("error from setting scroller clips = ", error);
        });
    }

    onSetIsScrollerClip = (clip) => {

        const isScrollerClip = clip.isScrollerClip;
        const isAssigning = !isScrollerClip;

        if (isAssigning) {
            this.setState(prevState => ({
                clipData: prevState.clipData.map((clip) => {
                    if (!clip.isScrollerClip) {
                        clip.imgClass = "dim"
                        return clip;
                    } else {
                        return clip;
                    }
                }),
                prompt: "Select the clip to replace"
            }))
        } else {
            this.setState(prevState => ({
                clipData: prevState.clipData.map((clip) => {
                    if (clip.isScrollerClip || clip.isMainScrollerClip) {
                        clip.imgClass = "dim"
                        return clip;
                    } else return clip;
                }),
                prompt: "Select the clip to replace"
            }));
        }

        this.setState({
            isSettingScrollerClips: true,
            editingClipUrl: clip.clipUrl
        });
    };

    onSetMainClip = (clipArg) => {
        const isSettingAsMain = !clipArg.isMainScrollerClip;
        const clipData = [...this.state.clipData];
        const forIndex = clipData.find(clip => clip.isMainScrollerClip === true);
        const mainClip = { ...clipData.find(clip => clip.isMainScrollerClip === true) }
        const index = clipData.indexOf(forIndex);

        if (!isSettingAsMain) {
            console.log("not setting as main called");
            mainClip.imgClass = "dim";

            clipData[index] = mainClip;
            this.setState({
                prompt: "Select the main clip you want to use.",
                isSettingMainClip: true,
                clipData
            });

            return;
        }

        mainClip.isMainScrollerClip = false;

        if (clipArg.isScrollerClip) {
            mainClip.isScrollerClip = true;
        }

        const scrollerClipForIndex = clipData.find(clip => clip.clipUrl === clipArg.clipUrl);
        const scrollerClipIndex = clipData.indexOf(scrollerClipForIndex);
        const scrollerClip = { ...clipData.find(clip => clip.clipUrl === clipArg.clipUrl) };

        scrollerClip.isMainScrollerClip = true;
        scrollerClip.isScrollerClip = false;

        clipData[index] = mainClip;
        clipData[scrollerClipIndex] = scrollerClip;

        this.setState({
            clipData: clipData
        });
    }

    onSwitchMainClip = (clip) => {
        const selectedIsScrollerClip = clip.isScrollerClip;
        // Make shallow copy...
        const clipData = [...this.state.clipData];

        // For getting the index...
        const currentMainClipIndex = clipData.find(c => c.isMainScrollerClip);
        const index = clipData.indexOf(currentMainClipIndex);

        // Make shallow copy of the mutating object...
        const currentMainClip = { ...clipData.find(c => c.isMainScrollerClip) };

        // Perform mutations...
        currentMainClip.isMainScrollerClip = false;
        currentMainClip.imgClass = "";

        clip.isMainScrollerClip = true;

        if (selectedIsScrollerClip) {
            currentMainClip.isScrollerClip = true;
            clip.isScrollerClip = false;
        }

        clipData[index] = currentMainClip;

        this.setState({
            clipData: clipData,
            prompt: "",
            isSettingMainClip: false
        });
    }

    onReplaceClip = (clip) => {
        this.setState(prevState => ({
            clipData: prevState.clipData.map((i) => {
                if (i.clipUrl === this.state.editingClipUrl) {
                    i.isScrollerClip = !i.isScrollerClip;
                }
                if (i.clipUrl === clip.clipUrl) {
                    i.isScrollerClip = !i.isScrollerClip
                }
                i.imgClass = "";

                return i;
            }),
            isSettingScrollerClips: false,
            prompt: "",
            editingClipUrl: ""
        }))
    }

    onCancelSettingScrollerClips = () => {
        if (this.state.isSettingScrollerClips) {

            this.setState(prevState => ({
                isSettingScrollerClips: false,
                clipData: prevState.clipData.map((clip) => {
                    clip.imgClass = "";
                    return clip;
                }),
                prompt: "",
                editingClipUrl: ""
            }))
        } else if (this.state.isSettingMainClip) {
            const clipData = [...this.state.clipData];
            const mainClip = clipData.find(clip => clip.isMainScrollerClip);
            mainClip.imgClass = "";

            this.setState({
                isSettingMainClip: false,
                clipData: clipData,
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
                            <Button text="Save Changes" disabled={this.state.saveButtonDisabled} clickHandler={this.onSaveClicked} />
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
                        <div className="clip-space-filler"></div>
                        <div className="clip-space-filler"></div>
                        <div className="clip-space-filler"></div>
                    </div>
                }
            </div>
        )
    }
}

export default Clips;


// Soloution for initial state problem
// 1 - Create shallow copy of the array
    // Const clipData = [...this.state.clipData]
// 2 - Create Shallow copy of thing you want to mutate
    // const mainClip = {...clipdata.find(clip => clip.isMainClip)}
// 3 Get the index of the mutated item
    // const clipObjectForIndex = clipData.find(clip => clip.isMainclip)
    // const index = clipData.indexOf(clipObjectForIndex)
// 4 - Do mutations
    // mainClip.someProp = SomeVal
// Add the mutated object back intot he arrray
    // clipData[index] = mainClip
// 5 set the state to the copy
    // this.setState({clipData: clipData})