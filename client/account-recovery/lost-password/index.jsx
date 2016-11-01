/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import PageViewTracker from 'lib/analytics/page-view-tracker';
import support from 'lib/url/support';
import Main from 'components/main';
import DocumentHead from 'components/data/document-head';
import Card from 'components/card';
import Button from 'components/button';
import FormLabel from 'components/forms/form-label';
import FormInput from 'components/forms/form-text-input';

export class LostPasswordComponent extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			isSubmitting: false,
		};
	}

	onSubmit = () => {
		this.setState( { isSubmitting: true } );

		//TODO: dispatch an event with userLogin and wait to here back
	};

	onUserLoginChanged = ( event ) => {
		this.setState( { userLogin: event.target.value } );
	}

	render() {
		const { translate, className } = this.props;
		const { isSubmitting, userLogin } = this.state;
		const classes = classnames( 'lost-password__container', className );
		const isPrimaryButtonDisabled = ! userLogin || isSubmitting;

		return (
			<div className={ classes }>
				<h2 className="lost-password__title">
					{ translate( 'Lost your password' ) }
				</h2>

				<p>{ translate( 'Follow these simple steps to reset your account:' ) }</p>

				<ol className="lost-password__instruction-list">
					<li>
						{ translate(
							'Enter your {{strong}}WordPress.com{{/strong}} username or email address',
							{ components: { strong: <strong /> } }
						) }
					</li>
					<li>
						{ translate( 'Choose a password reset method' ) }
					</li>
					<li>
						{ translate(
							'Follow instructions and be re-united with your {{strong}}WordPress.com{{/strong}} account',
							{ components: { strong: <strong /> } }
						) }
					</li>
				</ol>

				<p>
					{ translate(
						'Want more help? We have a full {{link}}guide to resetting your password{{/link}}.',
						{ components: { link: <a href={ support.ACCOUNT_RECOVERY } /> } }
					) }
				</p>

				<Card>
					<FormLabel>
						{ translate( 'Username or Email' ) }

						<FormInput
							className="lost-password__user-login-input"
							onChange={ this.onUserLoginChanged }
							disabled={ isSubmitting } />
					</FormLabel>

					<a href="/account-recovery/username" className="lost-password__forgot-username-link">
						{ translate( 'Forgot your username?' ) }
					</a>

					<Button
						className="lost-password__submit-button"
						onClick={ this.onSubmit }
						disabled={ isPrimaryButtonDisabled }
						primary
					>
						{ translate( 'Get New Password' ) }
					</Button>
				</Card>

			</div>
		);
	}
}

export const LostPassword = localize( LostPasswordComponent );

export const LostPasswordPage = localize( ( { translate, basePath } ) => (
	<Main>
		<PageViewTracker path={ basePath } title="Account Recovery > Lost Password" />
		<DocumentHead title={ translate( 'Lost Password ‹ Account Recovery' ) } />
		<LostPassword className="account-recovery__container" />
	</Main>
) );
