import React from 'react';

const TedOverview = React.createClass({

    render () {

        const props = this.props;
        let moreComponent = props.data.more ? <div className={'more font-info-dark'}>{props.data.more}</div> : null;

        let talkName = props.data.name.length <= 60 ? props.data.name : props.data.name.slice(0,60) + ' ...';

        var playlistInfo = (data) => {
            const stageStyle = {
                background: 'url('+ data.url+') no-repeat',
                backgroundSize: '100% 100%'
            }
            return (
                <div className={'playlist-info'}>
                    <div className={'image'} style={stageStyle}></div>
                    <div className={'text'}>
                        <div className={'font-info'}>How does DNA work?</div>
                        <div className={'font-info'}>1 of 7 talks - 1h 56m</div>
                    </div>
                </div>
            );
        };

        return (
            <div className={'overview'}>
                {props.playlistInfo ? playlistInfo(props.playlistInfo) : null}
                <div className={'font-body'}>{props.data.title}</div>
                <div className={'font-header'}>{this.props.cut ? talkName : props.data.name}</div>
                {moreComponent}
            </div>
        );
    }
});

module.exports = TedOverview;