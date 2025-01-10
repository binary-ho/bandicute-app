import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

export default function Page() {
  const INJECTED_JAVASCRIPT = `
    (function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'PAGE_LOADED'
      }));
    })();
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://bandicute.vercel.app' }}
        style={styles.webview}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={(event) => {
          console.log('Message from WebView:', event.nativeEvent.data);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  webview: {
    flex: 1,
  },
});
