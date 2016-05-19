import React from 'react';

const TedDescription = React.createClass({

    render () {

        const dataStr = this.props.data;
        let des = dataStr.length <= 250 ? dataStr : dataStr.slice(0,250) + ' ...';

        return (
            <div className={'overview desc font-body'}>
                {this.props.cut ? des: this.props.data}
            </div>
        );
    }
});

module.exports = TedDescription;