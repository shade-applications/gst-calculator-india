export const useInterstitialAd = () => {
    return {
        isLoaded: false,
        showAd: () => {
            console.log('Interstitial Ad ignored on Web');
        },
    };
};
