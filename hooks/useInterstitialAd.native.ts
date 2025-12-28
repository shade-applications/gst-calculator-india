import { useEffect, useState } from 'react';
import { AdEventType, RewardedInterstitialAd, TestIds } from 'react-native-google-mobile-ads';

const DEV_MODE = __DEV__;
const INTERSTITIAL_ID = DEV_MODE ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-1828915420581549/3082513151';

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
    requestNonPersonalizedAdsOnly: true,
});

export const useInterstitialAd = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
            AdEventType.LOADED,
            () => { setIsLoaded(true); }
        );
        const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                setIsLoaded(false);
                rewardedInterstitial.load(); // Load the next one
            }
        );

        rewardedInterstitial.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeClosed();
        };
    }, []);

    const showAd = () => {
        if (isLoaded) {
            rewardedInterstitial.show();
        }
    }

    return { isLoaded, showAd };
}
