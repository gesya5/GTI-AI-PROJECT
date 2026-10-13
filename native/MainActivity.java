package com.rextoai;

import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    static { System.loadLibrary("rexcore"); }

    public native String rexProcess(String input);
    public native String rexVersion();

    private WebView webView;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        webView.setWebViewClient(new WebViewClient());
        webView.addJavascriptInterface(new NativeBridge(), "RexNative");
        webView.loadUrl("file:///android_asset/www/index.html");
        setContentView(webView);
    }

    public class NativeBridge {
        @JavascriptInterface
        public String process(String input) { return rexProcess(input); }

        @JavascriptInterface
        public String version() { return rexVersion(); }
    }
}