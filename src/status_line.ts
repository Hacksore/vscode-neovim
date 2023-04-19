import * as vscode from "vscode";

const MODE_ICON: { [key: string]: string } = {
    insert: "🟢",
    visualline: "🟡",
    visualblock: "🟡",
    visual: "🟡",
    replace: "🔵",
};

export class StatusLineController implements vscode.Disposable {
    private modeItem: vscode.StatusBarItem;
    private commandItem: vscode.StatusBarItem;
    private msgItem: vscode.StatusBarItem;

    public constructor() {
        this.modeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
        this.commandItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5);
        this.msgItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    }

    public set modeString(str: string) {
        if (!str) {
            this.modeItem.hide();
        } else {
            const iconName: string = str.replace(/-|\s/g, "").toLowerCase();
            this.modeItem.text = MODE_ICON[iconName] + "  " + str;
            this.modeItem.color = "rgba(255,255,255)";
            this.modeItem.show();
        }
    }

    public set statusString(str: string) {
        if (!str) {
            this.commandItem.hide();
        } else {
            this.commandItem.text = str;
            this.commandItem.show();
        }
    }

    public set msgString(str: string) {
        if (!str) {
            this.msgItem.hide();
        } else {
            this.msgItem.text = str;
            this.msgItem.show();
        }
    }

    public dispose(): void {
        this.commandItem.dispose();
        this.modeItem.dispose();
        this.msgItem.dispose();
    }
}
