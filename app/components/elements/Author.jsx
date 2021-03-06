/* eslint react/prop-types: 0 */
import React from 'react'
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate'
import {LinkWithDropdown} from 'react-foundation-components/lib/global/dropdown'
import Follow from 'app/components/elements/Follow';
import Icon from 'app/components/elements/Icon'
import {browserHistory} from 'react-router'
import {authorNameAndRep} from 'app/utils/ComponentFormatters'

const {string, bool, number} = React.PropTypes

class Author extends React.Component {
    static propTypes = {
        author: string.isRequired,
        follow: bool,
        mute: bool,
        authorRepLog10: number,
    }
    static defaultProps = {
        follow: true,
        mute: true,
    }
    shouldComponentUpdate = shouldComponentUpdate(this, 'Author')
    onAuthorClick = () => {
        const {author} = this.props
        browserHistory.push('/@' + author)
    }
    render() {
        const {author, follow, mute, authorRepLog10} = this.props // html
        const {username} = this.props // redux

        const author_link = <span itemProp="author" itemScope itemType="http://schema.org/Person">
            <a onClick={this.onAuthorClick}>{authorNameAndRep(author, authorRepLog10)}</a>
        </span>

        if(!username)
            return author_link

        const dropdown = <span>
            <div className="row">
                <div className="column small-12">
                    {author_link}
                </div>
                <hr />
                <div className="column small-12">
                    <Follow className="float-right" follower={username} following={author} what="blog"
                        showFollow={follow} showMute={mute} />
                </div>
            </div>
        </span>
        return (
            <span className="Author">
                <LinkWithDropdown
                    closeOnClickOutside
                    dropdownPosition="bottom"
                    dropdownAlignment="center"
                    dropdownContent={dropdown}
                >
                    <span className="FoundationDropdownMenu__label">
                        <span itemProp="author" itemScope itemType="http://schema.org/Person">
                            {authorNameAndRep(author, authorRepLog10)}
                        </span>
                        <Icon className="dropdown-arrow" name="dropdown-arrow" />
                    </span>
                </LinkWithDropdown>
            </span>
        )
                // by <span itemProp="author" itemScope itemType="http://schema.org/Person"><Link
                //    to={author_link}>{content.author}</Link></span>
    }
}
import {connect} from 'react-redux'
export default connect(
    (state, ownProps) => {
        const current = state.user.get('current')
        const username = current && current.get('username')
        return {
            ...ownProps,
            username,
        }
    },
    // dispatch => ({
    //     vote: (abc) => {
    //         dispatch(transaction.actions.broadcastOperation({
    //             abc
    //         }))
    //     },
    // })
)(Author)
