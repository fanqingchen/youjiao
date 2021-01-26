import React, { Component } from 'react'
import './index.scss'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
export default class TopCard extends Component {
    static propTypes={
        pathLink:PropTypes.string.isRequired,
        iconClassName:PropTypes.string.isRequired,
        cardFirstTitle:PropTypes.string.isRequired,
        cardSetTitle:PropTypes.string.isRequired,
        bgColor:PropTypes.string.isRequired
    }
    render() {
        let{pathLink,iconClassName,cardFirstTitle,cardSetTitle,bgColor}=this.props
        return (
            //   顶部卡片330*185
            <Link className="home-card-top" style={{backgroundColor:bgColor}} to={pathLink}>
                    <i className={iconClassName}></i>
                    <p className='card-first'>{cardFirstTitle}</p>
                    <p>{cardSetTitle}</p>

            </Link>
        )
    }
}
