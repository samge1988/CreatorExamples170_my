
const SceneList = require('SceneList');

cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: null,
            type: cc.Label
        },
        readme: {
            default: null,
            type: cc.Node
        },
        btnInfo: {
            default: null,
            type: cc.Button
        },
        btnBack: {
            default: null,
            type: cc.Button
        },
        testList: {
            default: null,
            type: cc.ScrollView
        },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._isLoadingScene = false;
        this.showDebugDraw = false;
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = 'TestList.fire';
        this.contentPos = null;
        this.isMenu = true;
        this.btnBack.node.active = false;
        this.loadInstruction(this.currentSceneUrl);
        this.node.zIndex = 999;

        cc.game.addPersistRootNode(this.testList.node);
        if (this.testList && this.testList.content) {
            this.SceneList = this.testList.content.getComponent('SceneList');
            this.SceneList.init(this);
        }

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.b) {
                this.backToList();
            }
        }, this);

        this._updateInfoButton();
    },

    backToList: function () {
        if (this._isLoadingScene) {
            return;
        }
        this._isLoadingScene = true;
        this.showReadme(null, false);
        this.currentSceneUrl = 'TestList.fire';
        this.isMenu = true;
        cc.director.loadScene('TestList', this.onLoadSceneFinish.bind(this));
    },

    loadScene: function (url) {
        this._isLoadingScene = true;
        this.contentPos = this.testList.getContentPosition();
        this.currentSceneUrl = url;
        this.isMenu = false;
        this.testList.node.active = false;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));  
    },

    onLoadSceneFinish: function () {
        let url = this.currentSceneUrl;
        this.loadInstruction(url);
        if (this.isMenu && this.contentPos) {
            this.btnBack.node.active = false;
            this.testList.node.active = true;
            this.testList.setContentPosition(this.contentPos);
        } 
        else {
            this.btnBack.node.active = true;
            this.testList.node.active = false;
        }
        this._isLoadingScene = false;
    },

    loadInstruction: function (url) {
        let self = this;
        let urlArr = url.split('/');
        let fileName = urlArr[urlArr.length - 1].replace('.fire', '');

        cc.loader.loadRes('readme/' + fileName, function(err, txt) {
            if (err) {
                self.text.string = '暂无说明';
                return;
            }
            self.text.string = txt;
        });
    },

    _updateInfoButton: function () {
        let labelTxt = this.readme.active ? "显示说明" : "隐藏说明";

        //之所以要通过this.btnInfo.node这种方式访问，是因为在属性里btnInfo定义为cc.Button
        cc.find('Label', this.btnInfo.node).getComponent(cc.Label).string = labelTxt;
    },

    showReadme: function (event, active) {
        if (active === undefined) {
            this.readme.active = ! this.readme.active;
        }
        else
        {
            //this.readme本身已经定义为cc.Node，所以不能通过this.readme.node.active的方式
            this.readme.active = active;
        }

        // if (this.readme.node.active) {
        //     this.readme.scrollToTop();
        // }

        this._updateInfoButton()
    },

    restart: function () {
        cc.game.restart();
    },

    gc: function () {
        cc.sys.garbageCollect();    
    },

    start () {

    },

    // update (dt) {},
});
