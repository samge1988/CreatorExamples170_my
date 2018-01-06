
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

        item.x = x;
        item.y = y;
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
                let dirname = cc.path.dirname(url).replace('db://assets/cases/', '');
                
                if (dirname === 'db://assets/resources/test assets') {
                    continue;
                }

                let scenename = cc.path.basename(url, '.fire');
                if (scenename === 'TestList') {
                    continue;
                }

                if (!dirname) {
                    dirname = '_root';
                }

                if (!dict[dirname]) {
                    dict[dirname] = {};
                }

                dict[dirname][scenename] = url;
            }
        } else {
            cc.log('failed to get scene list!');
        }

        let dirs = Object.keys(dict);
        dirs.sort();

        for (let i = 0; i < dirs.length; i++) {
            this.sceneList.push({
                name: dirs[i],
                url: null
            });

            let scenenames = Object.keys(dict[dirs[i]]);
            scenenames.sort();
            for (let j = 0; j < scenenames.length; ++j) {
                let name = scenenames[j];
                this.sceneList.push({
                    name: name,
                    url: dict[dirs[i]][name]
                });
            }
        }

        let y = 0;
        this.node.height = (this.sceneList.length + 1) * 50;
        for (let i = 0; i < this.initItemCount; ++i) {
            let item = cc.instantiate(this.itemPrefab).getComponent('ListItem');
            let itemInfo = this.sceneList[i];
            item.init(this.menu);
            this.node.addChild(item.node);
            y -= 50;
            item.updateItem (i, y, itemInfo.name, itemInfo.url);
            this.itemList.push(item);
        }
    },

    getPositionInView: function (item) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        // this.updateTimer += dt;
        // if (this.updateTimer < this.updateInterval) {
        //     return;
        // }

        // this.updateTimer = 0;

        // let items = this.itemList;
        // let buffer = this.bufferZone;
        // let isDown = this.node.y < this.lastContentPosY;
        // let curItemCount = this.itemList.length;

        // let offset = 50 * curItemCount;

        // for (let i = 0; i < curItemCount; i++) {
        //     let item = items[i];
        //     let itemNode = item.node;
        //     let viewPos = this.getPositionInView(itemNode);

        //     if (isDown) {
        //         if (viewPos.y < -buffer && itemNode.y + offset < 0) {
        //             let newIdx = item.index - curItemCount;
        //             let newInfo = this.sceneList[newIdx];
        //             item.updateItem(newIdx, itemNode.y + offset, newInfo.name, newInfo.url );
        //         }
        //     } else {
        //         if (viewPos.y > buffer && itemNode.y - offset > -this.node.height) {
        //             let newIdx = item.index + curItemCount;
        //             let newInfo = this.sceneList[newIdx];
        //             item.updateItem(newIdx, itemNode.y - offset, newInfo.name, newInfo.url);
        //         }
        //     }
        // }

        // this.lastContentPosY = this.node.y;
    },
});
