import React from 'react';

import { makeRouteConfig, Route } from 'found';
import { graphql } from 'react-relay';

import { AddItem } from './components/AddItem';
import { Group } from './components/Group';
import { GroupList } from './components/GroupList';
import { Template } from './components/Template';

const Home = () => <div>Home</div>;

export const routeConfig = makeRouteConfig(
	<Route
		Component={Template}
		query={graphql`
			query routes_Template_Query {
				viewer {
					...Template_viewer
				}
			}
		`}
	>
		<Route path="/" Component={Home} />
		<Route path="groups">
			<Route
				Component={GroupList}
				query={graphql`
					query routes_GroupList_Query {
						viewer {
							groups {
								...GroupList_groups
							}
						}
					}
				`}
				render={({ props }) => {
					if (props) {
						if (props.viewer.groups) {
							return <GroupList groups={props.viewer.groups} />;
						}

						return <div>No groups</div>;
					}

					return <div>Loading...</div>;
				}}
			/>
			<Route path=":groupId">
				<Route
					Component={Group}
					prepareVariables={(params: any) => {
						return {
							id: params.groupId,
						};
					}}
					query={graphql`
						query routes_Group_Query($id: ID!) {
							group: node(id: $id) {
								...Group_group
							}
						}
					`}
				/>
				<Route
					path="create-item"
					Component={AddItem}
					prepareVariables={(params: any) => {
						return {
							id: params.groupId,
						};
					}}
					query={graphql`
						query routes_CreateItem_Query($id: ID!) {
							group: node(id: $id) {
								...AddItem_group
							}
						}
					`}
				/>
			</Route>
		</Route>
	</Route>,
);
