/**
 * External dependencies
 */
import { assert } from 'chai';
import sinon from 'sinon';

/**
 * Internal dependencies
 */
import { useNock } from 'test/helpers/use-nock';

import {
	accountRecoveryFetch,
	accountRecoveryFetchSuccess,
	accountRecoveryFetchFailed,

	updateAccountRecoveryPhone,
	updateAccountRecoveryPhoneSuccess,
	updateAccountRecoveryPhoneFailed,

	deleteAccountRecoveryPhone,
	deleteAccountRecoveryPhoneSuccess,
	deleteAccountRecoveryPhoneFailed,

	updateAccountRecoveryEmail,
	updateAccountRecoveryEmailSuccess,
	updateAccountRecoveryEmailFailed,
} from '../actions';

import {
	ACCOUNT_RECOVERY_FETCH,
	ACCOUNT_RECOVERY_FETCH_SUCCESS,
	ACCOUNT_RECOVERY_FETCH_FAILED,

	ACCOUNT_RECOVERY_PHONE_UPDATE,
	ACCOUNT_RECOVERY_PHONE_UPDATE_SUCCESS,
	ACCOUNT_RECOVERY_PHONE_UPDATE_FAILED,

	ACCOUNT_RECOVERY_PHONE_DELETE,
	ACCOUNT_RECOVERY_PHONE_DELETE_SUCCESS,
	ACCOUNT_RECOVERY_PHONE_DELETE_FAILED,

	ACCOUNT_RECOVERY_EMAIL_UPDATE,
	ACCOUNT_RECOVERY_EMAIL_UPDATE_SUCCESS,
	ACCOUNT_RECOVERY_EMAIL_UPDATE_FAILED,
} from '../../action-types';

import dummyData from './test-data';

describe( 'account-recovery ctions', () => {
	const spy = sinon.spy();

	beforeEach( () => {
		spy.reset();
	} );

	describe( '#accountRecoveryFetch()', () => {
		useNock( ( nock ) => {
			nock( 'https://public-api.wordpress.com:443' )
				.get( '/rest/v1.1/me/account-recovery' )
				.reply( 200, dummyData );
		} );

		it( 'should dispatch fetch / success actions.', () => {
			const fetch = accountRecoveryFetch()( spy );

			assert( spy.calledWith( { type: ACCOUNT_RECOVERY_FETCH } ) );

			return fetch.then( () => {
				assert( spy.calledWith( {
					type: ACCOUNT_RECOVERY_FETCH_SUCCESS,
					accountRecoverySettings: dummyData,
				} ) );
			} );
		} );
	} );

	describe( '#accountRecoveryFetchSuccess()', () => {
		it( 'should return ACCOUNT_RECOVERY_FETCH_SUCCESS', () => {
			const action = accountRecoveryFetchSuccess( dummyData );
			assert.deepEqual( action, {
				type: ACCOUNT_RECOVERY_FETCH_SUCCESS,
				accountRecoverySettings: dummyData,
			} );
		} );
	} );

	describe( '#accountRecoveryFetchFailed()', () => {
		it( 'should return ACCOUNT_RECOVERY_FETCH_FAILED', () => {
			const dummyError = 'failed';
			const action = accountRecoveryFetchFailed( dummyError );

			assert.deepEqual( action, {
				type: ACCOUNT_RECOVERY_FETCH_FAILED,
				error: dummyError,
			} );
		} );
	} );

	describe( '#updateAccountRecoveryPhone', () => {
		const newPhoneData = {
			country_code: 'US',
			country_numeric_code: '+1',
			number: '8881234567',
			number_full: '+18881234567',
		};

		useNock( ( nock ) => {
			nock( 'https://public-api.wordpress.com:443' )
				.post( '/rest/v1.1/me/account-recovery/phone' )
				.reply( 200, newPhoneData );
		} );

		it( 'should dispatch update / success actions.', () => {
			const update = updateAccountRecoveryPhone( newPhoneData.country_code, newPhoneData.number )( spy );

			assert( spy.calledWith( { type: ACCOUNT_RECOVERY_PHONE_UPDATE } ) );

			return update.then( () => {
				assert( spy.calledWith( {
					type: ACCOUNT_RECOVERY_PHONE_UPDATE_SUCCESS,
					phone: newPhoneData,
				} ) );
			} );
		} );
	} );

	describe( '#updateAccountRecoveryPhoneSuccess', () => {
		it( 'should return ACCOUNT_RECOVERY_PHONE_UPDATE_SUCCESS', () => {
			const phone = dummyData.phone;
			const action = updateAccountRecoveryPhoneSuccess( phone );

			assert.deepEqual( action, {
				type: ACCOUNT_RECOVERY_PHONE_UPDATE_SUCCESS,
				phone,
			} );
		} );
	} );

	describe( '#updateAccountRecoveryPhoneFailed', () => {
		it( 'should return ACCOUNT_RECOVERY_PHONE_UPDATE_FAILED', () => {
			const dummyError = 'failed';
			const action = updateAccountRecoveryPhoneFailed( dummyError );

			assert.deepEqual( action, {
				type: ACCOUNT_RECOVERY_PHONE_UPDATE_FAILED,
				error: dummyError,
			} );
		} );
	} );

	describe( '#deleteAccountRecoveryPhone', () => {
		useNock( ( nock ) => {
			nock( 'https://public-api.wordpress.com:443' )
				.post( '/rest/v1.1/me/account-recovery/phone/delete' )
				.reply( 200 );
		} );

		it( 'should dispatch delete / success actions', () => {
			const del = deleteAccountRecoveryPhone()( spy );

			assert( spy.calledWith( { type: ACCOUNT_RECOVERY_PHONE_DELETE } ) );

			return del.then( () => {
				assert( spy.calledWith( { type: ACCOUNT_RECOVERY_PHONE_DELETE_SUCCESS } ) );
			} );
		} );
	} );

	describe( '#deleteAccountRecoveryPhoneSuccess', () => {
		it( 'should return ACCOUNT_RECOVERY_PHONE_DELETE_SUCCESS', () => {
			const action = deleteAccountRecoveryPhoneSuccess();

			assert.deepEqual( action, {
				type: ACCOUNT_RECOVERY_PHONE_DELETE_SUCCESS,
			} );
		} );
	} );

	describe( '#deleteAccountRecoveryPhoneFailed', () => {
		it( 'should return ACCOUNT_RECOVERY_PHONE_DELETE_FAILED', () => {
			const dummyError = 'failed';
			const action = deleteAccountRecoveryPhoneFailed( dummyError );

			assert.deepEqual( action, {
				type: ACCOUNT_RECOVERY_PHONE_DELETE_FAILED,
				error: dummyError,
			} );
		} );
	} );

	describe( '#updateAccountRecoveryEmail', () => {
		const newEmail = { email: 'newtest@a8ctest.com' };

		useNock( ( nock ) => {
			nock( 'https://public-api.wordpress.com:443' )
				.post( '/rest/v1.1/me/account-recovery/email' )
				.reply( 200, newEmail );
		} );

		it( 'should dispatch update / success actions', () => {
			const update = updateAccountRecoveryEmail( newEmail )( spy );

			assert( spy.calledWith( { type: ACCOUNT_RECOVERY_EMAIL_UPDATE } ) );

			return update.then( () => {
				assert( spy.calledWith( {
					type: ACCOUNT_RECOVERY_EMAIL_UPDATE_SUCCESS,
					email: newEmail,
				} ) );
			} );
		} );
	} );

	describe( '#updateAccountRecoveryEmailSuccess', () => {
		it( 'should return ACCOUNT_RECOVERY_EMAIL_UPDATE_SUCCESS', () => {
			const action = updateAccountRecoveryEmailSuccess( dummyData.email );

			assert.deepEqual( action, {
				type: ACCOUNT_RECOVERY_EMAIL_UPDATE_SUCCESS,
				email: dummyData.email,
			} );
		} );
	} );

	describe( '#updateAccountRecoveryEmailFailed', () => {
		it( 'should return ACCOUNT_RECOVERY_EMAIL_FAILED', () => {
			const dummyError = 'failed';
			const action = updateAccountRecoveryEmailFailed( dummyError );

			assert.deepEqual( action, {
				type: ACCOUNT_RECOVERY_EMAIL_UPDATE_FAILED,
				error: dummyError,
			} );
		} );
	} );
} );
