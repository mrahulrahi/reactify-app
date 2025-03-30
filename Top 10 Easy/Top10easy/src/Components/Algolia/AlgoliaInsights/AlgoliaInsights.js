import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import aa from 'search-insights';
import { userLoginState } from '../../../context/appState';


export default function AlgoliaInsights({ searchClient }) {
    const userAuth = useRecoilValue(userLoginState);

    useEffect(()=>{
      // Since search-insights@2.0.0, cookie is not used for anonymous user token.
      // If you wish to continue, you can pass `useCookie: true`.
      aa('init', {
        appId: 'CP26C79INL',
        apiKey: '31c8c44b6cafedf9325e9c1748b215dc'
      })
      console.log('init ai middleware for ', userAuth.email.split('@')[0])
      aa('setUserToken', userAuth.email.split('@')[0]);
    }, [userAuth, searchClient])

    return null
}