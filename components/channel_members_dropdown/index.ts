// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {getChannelStats, updateChannelMemberSchemeRoles, removeChannelMember, getChannelMember} from 'mattermost-redux/actions/channels';
import {haveIChannelPermission} from 'mattermost-redux/selectors/entities/roles';
import {getLicense} from 'mattermost-redux/selectors/entities/general';
import {Permissions} from 'mattermost-redux/constants';
import {getCurrentUserId} from 'mattermost-redux/selectors/entities/users';

import {GenericAction} from 'mattermost-redux/types/actions';

import {canManageMembers} from 'utils/channel_utils.jsx';
import {GlobalState} from 'types/store';

import {OwnProps} from 'components/search_results/types';

import ChannelMembersDropdown from './channel_members_dropdown';

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const {channel} = ownProps;
    const canChangeMemberRoles = haveIChannelPermission(
        state,
        {
            channel: channel.id,
            team: channel.team_id,
            permission: Permissions.MANAGE_CHANNEL_ROLES,
        },
    ) && canManageMembers(state, channel);
    const license = getLicense(state);
    const isLicensed = license.IsLicensed === 'true';
    const canRemoveMember = canManageMembers(state, channel);

    return {
        currentUserId: getCurrentUserId(state),
        isLicensed,
        canChangeMemberRoles,
        canRemoveMember,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            getChannelMember,
            getChannelStats,
            updateChannelMemberSchemeRoles,
            removeChannelMember,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMembersDropdown);