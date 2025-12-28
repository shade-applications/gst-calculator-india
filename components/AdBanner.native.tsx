import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const DEV_MODE = __DEV__;
const BANNER_ID = DEV_MODE ? TestIds.BANNER : 'ca-app-pub-1828915420581549/9376458765';

export const AdBanner = () => {
    return (
        <BannerAd
            unitId={BANNER_ID}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    );
}
