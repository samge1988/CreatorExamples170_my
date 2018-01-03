
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },

        initItemCount: 0,
        scrollView: cc.ScrollView,
        bufferZone: 0,
    },

    createItem: function (x, y, name, url) {
        var item = cc.instantiate(this.itemPrefab);
        var itemComp = item.getComponent('ListItem');
        var label = itemComp.label;
        label.string = name;

        if (url) {
            itemComp.url = url;
        }

        item.x = x,
        item.y = y,
        this.node.addChild(item);
        return item;
    },

    init (menu) {
        this.menu = menu;
        this.sceneList = [];
        this.itemList = [];
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0;
        this.initList();
    },

    initList () {
        var scenes = cc.game._sceneInfos;
        var dict = {};

        if (scenes) {
            var i;
            for (i = 0; i < scenes.length; i++) {
                let url = scenes[i].url;
                let dirname = cc.path.dirname(url).replace()
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
