/**
 * External dependencies
 */
import wpcom from 'lib/wp';

/**
 * Internal dependencies
 */
import {
	ACCOUNT_RECOVERY_FETCH,
	ACCOUNT_RECOVERY_FETCH_SUCCESS,
	ACCOUNT_RECOVERY_FETCH_FAILED,

	ACCOUNT_RECOVERY_PHONE_UPDATE,
	ACCOUNT_RECOVERY_PHONE_UPDATE_SUCCESS,
	ACCOUNT_RECOVERY_PHONE_UPDATE_FAILED,
} from 'state/action-types';

export const accountRecoveryFetchSuccess = ( accountRecoverySettings ) => {
	return {
		type: ACCOUNT_RECOVERY_FETCH_SUCCESS,
		accountRecoverySettings,
	};
};

export const accountRecoveryFetchFailed = ( error ) => {
	return {
		type: ACCOUNT_RECOVERY_FETCH_FAILED,
		error,
	};
};

export const accountRecoveryFetch = () => ( dispatch ) => {
	dispatch( { type: ACCOUNT_RECOVERY_FETCH } );

	return new Promise( ( resolve, reject ) => {
		wpcom.undocumented().me().getAccountRecovery( ( error, accountRecoverySettings ) => {
			error ? reject( error ) : resolve( accountRecoverySettings );
		} );
	} ).then( ( accountRecoverySettings ) => {
		dispatch( accountRecoveryFetchSuccess( accountRecoverySettings ) );
	} ).catch( ( error ) => {
		dispatch( accountRecoveryFetchFailed( error ) );
	} );
};

export const updateAccountRecoveryPhoneSuccess = ( phone ) => {
	return {
		type: ACCOUNT_RECOVERY_PHONE_UPDATE_SUCCESS,
		phone,
	};
};

export const updateAccountRecoveryPhoneFailed = ( error ) => {
	return {
		type: ACCOUNT_RECOVERY_PHONE_UPDATE_FAILED,
		error,
	};
};

export const updateAccountRecoveryPhone = ( countryCode, number ) => ( dispatch ) => {
	return new Promise( ( resolve, reject ) => {
		dispatch( { type: ACCOUNT_RECOVERY_PHONE_UPDATE } );

		wpcom.undocumented().me().updateAccountRecoveryPhone( countryCode, number, ( error, phone ) => {
			error ? reject( error ) : resolve( phone );
		} );
	} ).then( ( phone ) => {
		dispatch( updateAccountRecoveryPhoneSuccess( phone ) );
	} ).catch( ( error ) => {
		dispatch( updateAccountRecoveryPhoneFailed( error ) );
	} );
};

