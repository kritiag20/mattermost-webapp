// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {getTeam} from 'mattermost-redux/selectors/entities/teams';
import {getConfig} from 'mattermost-redux/selectors/entities/general';

import LocalStorageStore from 'stores/local_storage_store';

import {GlobalState} from 'types/store';

import {Team} from 'mattermost-redux/types/teams';

import AdminSidebarHeader from './admin_sidebar_header';


function mapStateToProps(state: GlobalState) {
    console.log(state);

    let user = getCurrentUser(state);

    const teamId = LocalStorageStore.getPreviousTeamId(user.id);

    let team: Team | undefined;
    if (teamId) {
        team = getTeam(state, teamId);
    }
    return {
        currentUser: user,
        team: team,
        siteName: getConfig(state).SiteName,
    };
}

export default connect(mapStateToProps)(AdminSidebarHeader);
