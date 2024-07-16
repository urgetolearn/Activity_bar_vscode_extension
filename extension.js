const vscode = require("vscode");

function activate(context) {
  const myViewProvider = new MyViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      MyViewProvider.viewType,
      myViewProvider
    )
  );
}

class MyViewProvider {
  static viewType = "myExtension.myView";

  constructor(extensionUri) {
    this._extensionUri = extensionUri;
  }

  resolveWebviewView(webviewView, context, _token) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
  }

  getHtmlForWebview(webview) {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Custom View</title>
        </head>
        <body>
            <h1>Hello, VS Code!</h1>
        </body>
        </html>`;
  }
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;
