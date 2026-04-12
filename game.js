// ==================== 克莱尔大钓鱼游戏 v2.1 - 修复版 ====================

// -------------------- 游戏常量 --------------------
const GAME_CONFIG = {
    width: 480,
    height: 854,
    humanLimit: 30,
    battleTime: 3,
    initialMoney: 300
};

// -------------------- 场景数据 --------------------
const SCENES = {
    cherryBlossom: {
        id: 'cherryBlossom',
        name: '樱花小溪',
        icon: '🌸',
        bgColor: 0xFFE4E1,
        waterColor: 0x87CEEB,
        trashRate: 0.03,
        unlocked: true,
        unlockRequirement: null,
        description: '春风拂过，粉色樱花瓣轻轻飘落...\n清澈的溪水中，鱼儿在花瓣间嬉戏',
        fishTypes: ['small_crucian', 'grass_carp', 'trash_fish']
    },
    moonlightLake: {
        id: 'moonlightLake',
        name: '月光湖泊',
        icon: '🌙',
        bgColor: 0x191970,
        waterColor: 0x000080,
        trashRate: 0.04,
        unlocked: false,
        unlockRequirement: { fishType: 'grass_carp', minWeight: 5, description: '在樱花小溪捕获1条≥5kg的草鱼' },
        description: '夜幕降临，湖面倒映着皎洁的月光...\n萤火虫在芦苇丛中闪烁，如梦似幻',
        fishTypes: ['carp', 'night_fish', 'big_crucian']
    },
    azureCoast: {
        id: 'azureCoast',
        name: '蔚蓝海岸',
        icon: '🌊',
        bgColor: 0x4169E1,
        waterColor: 0x1E90FF,
        trashRate: 0.05,
        unlocked: false,
        unlockRequirement: { fishType: 'night_fish', minWeight: 3, description: '在月光湖泊捕获1条≥3kg的夜光鱼' },
        description: '海浪拍打着礁石，海鸥在天空翱翔...\n咸咸的海风中，大鱼在深处游弋',
        fishTypes: ['black_fish', 'small_shark', 'big_shark']
    },
    abyssRift: {
        id: 'abyssRift',
        name: '深渊裂缝',
        icon: '🌌',
        bgColor: 0x2F004F,
        waterColor: 0x4B0082,
        trashRate: 0.06,
        unlocked: false,
        unlockRequirement: { fishType: 'big_shark', minWeight: 30, description: '在蔚蓝海岸捕获1条≥30kg的大鲨鱼' },
        description: '紫黑色的水域中，闪电不时划过天空...\n传说中的深渊鱼王，正潜伏在黑暗深处',
        fishTypes: ['big_shark', 'abyss_king'],
        completionRequirement: { fishType: 'abyss_king', count: 3, description: '捕获3条深渊鱼王即可通关！' },
        isFinalStage: true
    }
};

// -------------------- 鱼类数据 --------------------
const FISH_DATA = {
    trash_fish: { id: 'trash_fish', name: '杂鱼', weightMin: 0.1, weightMax: 0.5, value: 15, clicks3s: 5, baits: ['bread'] },
    small_crucian: { id: 'small_crucian', name: '小鲫鱼', weightMin: 0.3, weightMax: 1, value: 50, clicks3s: 5, baits: ['bread', 'worm'] },
    big_crucian: { id: 'big_crucian', name: '大鲫鱼', weightMin: 1, weightMax: 2, value: 60, clicks3s: 6, baits: ['worm'] },
    carp: { id: 'carp', name: '鲤鱼', weightMin: 1, weightMax: 5, value: 80, clicks3s: 7, baits: ['worm', 'shrimp'] },
    grass_carp: { id: 'grass_carp', name: '草鱼', weightMin: 2, weightMax: 10, value: 100, clicks3s: 8, baits: ['bread', 'worm'] },
    black_fish: { id: 'black_fish', name: '黑鱼', weightMin: 5, weightMax: 15, value: 150, clicks3s: 9, baits: ['shrimp'] },
    night_fish: { id: 'night_fish', name: '夜光鱼', weightMin: 2, weightMax: 5, value: 200, clicks3s: 8, baits: ['glow'] },
    gold_fish: { id: 'gold_fish', name: '金鱼', weightMin: 0.5, weightMax: 0.5, value: 500, clicks3s: 6, baits: ['gold'] },
    small_shark: { id: 'small_shark', name: '小鲨鱼', weightMin: 10, weightMax: 20, value: 200, clicks3s: 10, baits: ['shrimp'] },
    big_shark: { id: 'big_shark', name: '大鲨鱼', weightMin: 20, weightMax: 50, value: 300, clicks3s: 11, baits: ['shrimp', 'glow'] },
    abyss_king: { id: 'abyss_king', name: '深渊鱼王', weightMin: 50, weightMax: 100, value: 500, clicks3s: 12, baits: ['gold'] }
};

// -------------------- 钓竿数据 --------------------
const RODS = {
    bamboo: { id: 'bamboo', name: '竹竿', icon: '🎋', singleMaxWeight: 5, totalMaxWeight: 5, slots: 1, multiFishBonus: 0, price: 100, description: '新手入门，适合钓小鱼' },
    fiberglass: { id: 'fiberglass', name: '玻璃钢竿', icon: '🎣', singleMaxWeight: 15, totalMaxWeight: 30, slots: 2, multiFishBonus: 0.10, price: 400, description: '结实耐用，可钓中等鱼类' },
    carbon: { id: 'carbon', name: '碳素竿', icon: '🗡️', singleMaxWeight: 30, totalMaxWeight: 60, slots: 2, multiFishBonus: 0.15, price: 1200, description: '轻便灵敏，海岸钓鱼必备' },
    titanium: { id: 'titanium', name: '钛合金竿', icon: '⚡', singleMaxWeight: 60, totalMaxWeight: 180, slots: 3, multiFishBonus: 0.20, price: 4000, description: '深海巨物克星' },
    nano: { id: 'nano', name: '纳米合成竿', icon: '🌟', singleMaxWeight: 120, totalMaxWeight: 480, slots: 4, multiFishBonus: 0.25, price: 10000, description: '终极装备，深渊鱼王专属' }
};

// -------------------- 鱼饵数据 --------------------
const BAITS = {
    bread: { id: 'bread', name: '面包屑', price: 5, maxCount: 99, clickBonus: 0, description: '基础饵' },
    worm: { id: 'worm', name: '蚯蚓', price: 15, maxCount: 50, clickBonus: 1, description: '减少假动作' },
    shrimp: { id: 'shrimp', name: '虾仁', price: 40, maxCount: 30, clickBonus: 2, description: '增加大鱼率' },
    glow: { id: 'glow', name: '发光饵', price: 100, maxCount: 15, clickBonus: 2, description: '夜间必备' },
    gold: { id: 'gold', name: '黄金饵', price: 300, maxCount: 5, clickBonus: 3, description: '触发隐藏鱼种' }
};

// -------------------- 垃圾数据 --------------------
const TRASH_DATA = {
    shoe: { id: 'shoe', name: '破鞋', penalty: 10, description: '旧布鞋，水草缠绕' },
    can: { id: 'can', name: '破罐头', penalty: 15, description: '生锈罐头，标签模糊' },
    snake: { id: 'snake', name: '蛇', penalty: 30, description: '触发惊吓效果' }
};

// -------------------- 克莱尔表情 --------------------
const CLAIRE_EXPRESSIONS = {
    happy: { emoji: '😊', text: '今天也是好天气~' },
    excited: { emoji: '😄', text: '太棒了！大丰收！' },
    nervous: { emoji: '😰', text: '来了来了！' },
    struggling: { emoji: '😤', text: '加油加油！' },
    sad: { emoji: '😢', text: '呜呜...跑掉了...' },
    scared: { emoji: '😱', text: '呀！是蛇！' },
    surprised: { emoji: '🤩', text: '哇！是金鱼！' },
    pleading: { emoji: '🥺', text: '没钱买鱼饵了...' },
    disgusted: { emoji: '🤢', text: '好恶心啊...' }
};

// -------------------- 游戏状态 --------------------
let GameState = {
    money: GAME_CONFIG.initialMoney,
    currentScene: 'cherryBlossom',
    currentRod: 'bamboo',
    baitInventory: { bread: 10, worm: 0, shrimp: 0, glow: 0, gold: 0 },
    selectedBaits: [],
    combo: 0,
    totalCaught: 0,
    goldfishBonus: false,   // 连击奖励触发金鱼
    rescueMode: false,      // 救助模式
    sceneProgress: {
        cherryBlossom: { unlocked: true, bestWeights: {} },
        moonlightLake: { unlocked: false, bestWeights: {} },
        azureCoast: { unlocked: false, bestWeights: {} },
        abyssRift: { unlocked: false, bestWeights: {}, completionCount: 0 }
    },
    unlockedRods: ['bamboo'],
    firstEnterScene: { cherryBlossom: true, moonlightLake: true, azureCoast: true, abyssRift: true }
};

// 检查游戏是否失败（没钱买任何装备且没有库存）
function isGameOver() {
    const totalInventory = Object.values(GameState.baitInventory).reduce((sum, count) => sum + count, 0);
    const cheapestBaitPrice = Math.min(...Object.values(BAITS).map(b => b.price));

    // 没钱买最便宜的鱼饵，且没有任何库存
    if (GameState.money < cheapestBaitPrice && totalInventory === 0) {
        return true;
    }
    return false;
}

// ==================== 开场场景 ====================
class BootScene extends Phaser.Scene {
    constructor() { super({ key: 'BootScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // 背景
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xFFB6C1).setOrigin(0);

        // 克莱尔（简笔画）- 使用简单形状避免兼容性问题
        const claireY = cy - 80;
        
        // 头发
        this.add.ellipse(cx - 45, claireY - 35, 35, 55, 0x8B4513);
        this.add.ellipse(cx + 45, claireY - 35, 35, 55, 0x8B4513);
        this.add.ellipse(cx, claireY - 45, 70, 45, 0x8B4513);
        
        // 脸
        this.add.circle(cx, claireY, 50, 0xFFDBAC);
        
        // 眼睛
        this.add.circle(cx - 18, claireY - 5, 11, 0x000000);
        this.add.circle(cx + 18, claireY - 5, 11, 0x000000);
        this.add.circle(cx - 14, claireY - 9, 4, 0xFFFFFF);
        this.add.circle(cx + 22, claireY - 9, 4, 0xFFFFFF);
        
        // 腮红
        this.add.circle(cx - 32, claireY + 12, 9, 0xFFB6C1, 0.6);
        this.add.circle(cx + 32, claireY + 12, 9, 0xFFB6C1, 0.6);
        
        // 嘴巴（简单的弧线）
        const mouth = this.add.graphics();
        mouth.lineStyle(3, 0xFF69B4);
        mouth.beginPath();
        mouth.arc(cx, claireY + 18, 13, 0, Math.PI);
        mouth.strokePath();
        
        // 身体
        this.add.ellipse(cx, claireY + 65, 70, 55, 0xFF69B4);

        // 标题
        this.add.text(cx, cy + 50, '克莱尔大钓鱼', {
            fontSize: '48px',
            fontFamily: 'Microsoft YaHei',
            color: '#FFFFFF',
            stroke: '#FF1493',
            strokeThickness: 8
        }).setOrigin(0.5);

        // 副标题
        this.add.text(cx, cy + 120, '一起来钓鱼吧！', {
            fontSize: '26px',
            fontFamily: 'Microsoft YaHei',
            color: '#FF1493'
        }).setOrigin(0.5);

        // 开始按钮
        const btnBg = this.add.rectangle(cx, cy + 210, 200, 60, 0xFF1493);
        btnBg.setStrokeStyle(4, 0xFFFFFF);
        
        this.add.text(cx, cy + 210, '开始游戏', {
            fontSize: '28px',
            fontFamily: 'Microsoft YaHei',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        btnBg.setInteractive();
        btnBg.on('pointerover', () => btnBg.setFillStyle(0xFF69B4));
        btnBg.on('pointerout', () => btnBg.setFillStyle(0xFF1493));
        btnBg.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

// ==================== 主游戏场景 ====================
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.gameState = 'idle';
        this.wavePhase = 0;
        this.hookedResults = [];
        this.battleState = null;
        this.waveTimer = null;
    }

    create() {
        this.createBackground();
        this.createUI();
        this.createClaire();
        this.createFishingArea();
        
        if (GameState.firstEnterScene[GameState.currentScene]) {
            GameState.firstEnterScene[GameState.currentScene] = false;
            this.showSceneDescription();
        }
        
        this.updateUI();
    }

    createBackground() {
        const scene = SCENES[GameState.currentScene];
        
        // 天空
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, scene.bgColor).setOrigin(0);
        
        // 水面
        const waterY = 420;
        this.add.rectangle(0, waterY, this.cameras.main.width, this.cameras.main.height - waterY, scene.waterColor).setOrigin(0).setAlpha(0.85);
        
        // 水岸线
        this.add.rectangle(0, waterY, this.cameras.main.width, 4, 0xFFFFFF, 0.5).setOrigin(0);
    }

    showSceneDescription() {
        const scene = SCENES[GameState.currentScene];
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // 创建弹窗容器
        const container = this.add.container(cx, cy);
        container.setDepth(100);

        // 背景
        const bg = this.add.rectangle(0, 0, 420, 340, 0x000000, 0.95);
        bg.setStrokeStyle(4, 0xFFD700);
        container.add(bg);

        // 图标和标题
        container.add(this.add.text(0, -130, scene.icon, { fontSize: '60px' }).setOrigin(0.5));
        container.add(this.add.text(0, -65, scene.name, {
            fontSize: '36px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
        }).setOrigin(0.5));

        // 描述文字
        const lines = scene.description.split('\n');
        lines.forEach((line, i) => {
            container.add(this.add.text(0, -25 + i * 28, line, {
                fontSize: '15px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF', align: 'center'
            }).setOrigin(0.5));
        });

        // 显示升级到下一关的要求
        const nextScene = this.getNextScene();
        if (nextScene) {
            container.add(this.add.text(0, 55, '📋 升级条件', {
                fontSize: '16px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
            }).setOrigin(0.5));

            if (nextScene.completionRequirement) {
                // 深渊裂缝显示通关条件
                const req = nextScene.completionRequirement;
                const fishData = FISH_DATA[req.fishType];
                const current = GameState.sceneProgress[nextScene.id].completionCount || 0;
                container.add(this.add.text(0, 85, `${fishData.name} ${current}/${req.count}`, {
                    fontSize: '18px', fontFamily: 'Microsoft YaHei', color: current >= req.count ? '#00FF00' : '#FF6347'
                }).setOrigin(0.5));
                container.add(this.add.text(0, 115, req.description, {
                    fontSize: '14px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
                }).setOrigin(0.5));
            } else if (nextScene.unlockRequirement) {
                const req = nextScene.unlockRequirement;
                const fishData = FISH_DATA[req.fishType];
                const current = GameState.sceneProgress[nextScene.id].bestWeights[req.fishType] || 0;
                const target = `${req.minWeight}kg`;
                container.add(this.add.text(0, 85, `${fishData.name} ${current}/${target}`, {
                    fontSize: '18px', fontFamily: 'Microsoft YaHei', color: current >= req.minWeight ? '#00FF00' : '#FF6347'
                }).setOrigin(0.5));
                container.add(this.add.text(0, 115, req.description, {
                    fontSize: '14px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
                }).setOrigin(0.5));
            }
        } else if (scene.completionRequirement) {
            // 最后一关显示通关进度
            const req = scene.completionRequirement;
            const fishData = FISH_DATA[req.fishType];
            const current = GameState.sceneProgress[scene.id].completionCount || 0;
            container.add(this.add.text(0, 55, '🏆 通关条件', {
                fontSize: '16px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
            }).setOrigin(0.5));
            container.add(this.add.text(0, 85, `${fishData.name} ${current}/${req.count}`, {
                fontSize: '20px', fontFamily: 'Microsoft YaHei', color: current >= req.count ? '#00FF00' : '#FF6347'
            }).setOrigin(0.5));
            container.add(this.add.text(0, 115, req.description, {
                fontSize: '14px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
            }).setOrigin(0.5));
        }

        // 关闭按钮
        const btnBg = this.add.rectangle(0, 155, 140, 45, 0x4169E1);
        btnBg.setStrokeStyle(2, 0xFFFFFF);
        container.add(btnBg);

        const btnText = this.add.text(0, 155, '知道了', {
            fontSize: '20px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5);
        container.add(btnText);

        // 按钮交互
        btnBg.setInteractive();
        btnBg.on('pointerdown', () => {
            // 完全销毁弹窗，不只是隐藏
            container.destroy();
        });
    }

    getNextScene() {
        const sceneOrder = ['cherryBlossom', 'moonlightLake', 'azureCoast', 'abyssRift'];
        const currentIndex = sceneOrder.indexOf(GameState.currentScene);
        if (currentIndex < sceneOrder.length - 1) {
            return SCENES[sceneOrder[currentIndex + 1]];
        }
        return null; // 当前是最后一关
    }

    createClaire() {
        const cx = 100;
        const cy = 200;

        this.claireContainer = this.add.container(cx, cy);
        
        // 头发
        this.claireContainer.add(this.add.ellipse(-45, -35, 35, 55, 0x8B4513));
        this.claireContainer.add(this.add.ellipse(45, -35, 35, 55, 0x8B4513));
        this.claireContainer.add(this.add.ellipse(0, -45, 70, 45, 0x8B4513));
        
        // 脸
        this.claireContainer.add(this.add.circle(0, 0, 50, 0xFFDBAC));
        
        // 眼睛
        this.eyeL = this.add.circle(-18, -5, 11, 0x000000);
        this.eyeR = this.add.circle(18, -5, 11, 0x000000);
        this.claireContainer.add(this.eyeL);
        this.claireContainer.add(this.eyeR);
        this.claireContainer.add(this.add.circle(-14, -9, 4, 0xFFFFFF));
        this.claireContainer.add(this.add.circle(22, -9, 4, 0xFFFFFF));
        
        // 腮红
        this.claireContainer.add(this.add.circle(-32, 12, 9, 0xFFB6C1, 0.6));
        this.claireContainer.add(this.add.circle(32, 12, 9, 0xFFB6C1, 0.6));
        
        // 嘴巴
        this.mouth = this.add.arc(0, 18, 13, 0, 180, false, 0xFF69B4);
        this.mouth.setStrokeStyle(3, 0xFF69B4);
        this.claireContainer.add(this.mouth);
        
        // 身体
        this.claireContainer.add(this.add.ellipse(0, 65, 70, 55, 0xFF69B4));

        // 气泡
        this.speechBubble = this.add.container(cx + 80, cy - 60);
        const bubbleBg = this.add.rectangle(0, 0, 140, 50, 0xFFFFFF, 0.95);
        bubbleBg.setStrokeStyle(2, 0x000000);
        this.speechText = this.add.text(0, 0, '', {
            fontSize: '14px', fontFamily: 'Microsoft YaHei', color: '#000000', align: 'center'
        }).setOrigin(0.5);
        this.speechBubble.add([bubbleBg, this.speechText]);
        this.speechBubble.setVisible(false);

        this.setClaireExpression('happy');
    }

    setClaireExpression(expression) {
        const expr = CLAIRE_EXPRESSIONS[expression];
        if (!expr) return;

        this.speechText.setText(expr.text);
        this.speechBubble.setVisible(true);
        
        this.time.delayedCall(2500, () => {
            this.speechBubble.setVisible(false);
        });
    }

    createFishingArea() {
        const cx = this.cameras.main.width / 2;
        const waterY = 520;

        // 鱼竿
        this.rodContainer = this.add.container(cx - 80, 350);

        // 根据鱼竿类型创建不同样式
        this.updateRodGraphics();

        // 鱼线
        this.fishingLine = this.add.graphics();

        // 浮标
        this.floatContainer = this.add.container(cx, waterY);
        this.floatContainer.add(this.add.ellipse(0, 0, 20, 28, 0xFF0000));
        this.floatContainer.add(this.add.ellipse(0, -8, 18, 14, 0xFFFFFF));
        this.floatContainer.add(this.add.ellipse(0, 8, 18, 14, 0xFF0000));
        this.floatContainer.add(this.add.ellipse(-5, -5, 6, 8, 0xFFFFFF, 0.6));
        this.floatContainer.add(this.add.rectangle(0, -18, 2, 12, 0xFF0000));
        this.floatContainer.setVisible(false);

        // 水波纹
        this.waveRings = [];

        // 鱼线
        this.fishingLine = this.add.graphics();

        // 浮标
        this.floatContainer = this.add.container(cx, waterY);
        this.floatContainer.add(this.add.ellipse(0, 0, 20, 28, 0xFF0000));
        this.floatContainer.add(this.add.ellipse(0, -8, 18, 14, 0xFFFFFF));
        this.floatContainer.add(this.add.ellipse(0, 8, 18, 14, 0xFF0000));
        this.floatContainer.add(this.add.ellipse(-5, -5, 6, 8, 0xFFFFFF, 0.6));
        this.floatContainer.add(this.add.rectangle(0, -18, 2, 12, 0xFF0000));
        this.floatContainer.setVisible(false);

        // 水波纹
        this.waveRings = [];
        for (let i = 0; i < 4; i++) {
            this.waveRings.push({ graphic: this.add.graphics(), active: false });
        }

        // 钓鱼按钮
        this.fishBtn = this.createButton(cx, 720, '🎣 开始钓鱼', () => this.startFishing(), 160, 55);

        // 底部按钮
        this.configBtn = this.createButton(cx - 110, 800, '⚙️ 配置', () => {
            this.scene.pause();
            this.scene.launch('ConfigScene');
        }, 90, 45);

        this.shopBtn = this.createButton(cx, 800, '🏪 商店', () => {
            this.scene.pause();
            this.scene.launch('ShopScene');
        }, 90, 45);

        this.sceneBtn = this.createButton(cx + 110, 800, '🌍 场景', () => {
            this.scene.pause();
            this.scene.launch('SceneSelectScene');
        }, 90, 45);
    }

    createButton(x, y, text, callback, w, h) {
        // 创建按钮背景
        const bg = this.add.rectangle(x, y, w, h, 0x4169E1);
        bg.setStrokeStyle(3, 0xFFFFFF);
        
        // 创建按钮文字（不设置交互，让点击穿透到背景）
        const label = this.add.text(x, y, text, {
            fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5);
        label.setDepth(1); // 确保文字在背景之上
        
        // 只设置背景交互
        bg.setInteractive();
        bg.on('pointerover', () => bg.setFillStyle(0x6495ED));
        bg.on('pointerout', () => bg.setFillStyle(0x4169E1));
        bg.on('pointerdown', callback);
        
        // 返回对象方便控制显示/隐藏
        return { bg, label, setVisible: (v) => { bg.setVisible(v); label.setVisible(v); } };
    }

    createUI() {
        this.add.rectangle(0, 0, this.cameras.main.width, 65, 0x000000, 0.6).setOrigin(0);

        this.moneyText = this.add.text(15, 12, '💰 ¥' + GameState.money, {
            fontSize: '22px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
        });

        const scene = SCENES[GameState.currentScene];
        this.add.text(this.cameras.main.width / 2, 12, scene.icon + ' ' + scene.name, {
            fontSize: '22px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5, 0);

        const rod = RODS[GameState.currentRod];
        this.rodText = this.add.text(this.cameras.main.width - 15, 12, rod.icon + ' ' + rod.name, {
            fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
        }).setOrigin(1, 0);

        this.comboText = this.add.text(15, 38, '🔥 连击: ' + GameState.combo, {
            fontSize: '16px', fontFamily: 'Microsoft YaHei', color: '#FF6347'
        });
    }

    updateUI() {
        this.moneyText.setText('💰 ¥' + GameState.money);
        this.comboText.setText('🔥 连击: ' + GameState.combo);
        const rod = RODS[GameState.currentRod];
        this.rodText.setText(rod.icon + ' ' + rod.name);
        // 更新鱼竿图形
        this.updateRodGraphics();
    }

    updateRodGraphics() {
        // 清除旧的鱼竿图形
        if (this.rodGraphics) {
            this.rodGraphics.destroy();
        }

        const rodType = GameState.currentRod;
        this.rodGraphics = this.add.container(0, 0);

        // 根据鱼竿类型设置颜色和样式
        let rodColor1, rodColor2, rodColor3, handleColor, reelColor, rodWidth, rodHeight;

        switch (rodType) {
            case 'bamboo':
                // 竹竿 - 棕色，粗糙
                rodColor1 = 0x8B4513;
                rodColor2 = 0xA0522D;
                rodColor3 = 0xD2691E;
                handleColor = 0x654321;
                reelColor = 0xC0C0C0;
                rodWidth = 6;
                rodHeight = 120;
                break;
            case 'fiberglass':
                // 玻璃钢竿 - 深蓝色，轻便
                rodColor1 = 0x1E3A5F;
                rodColor2 = 0x2E5A8F;
                rodColor3 = 0x4169E1;
                handleColor = 0x2F2F2F;
                reelColor = 0xC0C0C0;
                rodWidth = 5;
                rodHeight = 130;
                break;
            case 'carbon':
                // 碳素竿 - 黑色，轻巧
                rodColor1 = 0x1A1A1A;
                rodColor2 = 0x333333;
                rodColor3 = 0x555555;
                handleColor = 0x8B0000;
                reelColor = 0xC0C0C0;
                rodWidth = 4;
                rodHeight = 140;
                break;
            case 'titanium':
                // 钛合金竿 - 银色，金属光泽
                rodColor1 = 0x71797E;
                rodColor2 = 0xA8A9AD;
                rodColor3 = 0xC0C0C0;
                handleColor = 0x36454F;
                reelColor = 0xFFD700;
                rodWidth = 5;
                rodHeight = 135;
                break;
            case 'nano':
                // 纳米合成竿 - 紫色未来感
                rodColor1 = 0x4B0082;
                rodColor2 = 0x6A0DAD;
                rodColor3 = 0x9370DB;
                handleColor = 0x2F2F4F;
                reelColor = 0x00FFFF;
                rodWidth = 4;
                rodHeight = 145;
                break;
            default:
                rodColor1 = 0x8B4513;
                rodColor2 = 0xA0522D;
                rodColor3 = 0xD2691E;
                handleColor = 0x654321;
                reelColor = 0xC0C0C0;
                rodWidth = 6;
                rodHeight = 120;
        }

        // 绘制鱼竿
        const rod = this.add.graphics();
        rod.lineStyle(rodWidth, rodColor1);
        rod.lineBetween(0, 0, rodHeight * 0.7, -rodHeight);
        rod.lineStyle(rodWidth - 2, rodColor2);
        rod.lineBetween(0, 0, rodHeight * 0.7, -rodHeight);
        rod.lineStyle(rodWidth - 4, rodColor3);
        rod.lineBetween(rodHeight * 0.5, -rodHeight * 0.7, rodHeight * 0.7, -rodHeight);

        // 握把
        const handle = this.add.rectangle(-10, 10, 25, 50, handleColor);
        handle.setAngle(-15);

        // 卷轴
        const reel = this.add.circle(15, -5, 15, reelColor);
        // 卷轴装饰
        const reelDetail = this.add.circle(15, -5, 8, 0x000000, 0.3);

        this.rodGraphics.add([handle, rod, reel, reelDetail]);
        this.rodContainer.add(this.rodGraphics);
    }

    startFishing() {
        // 检查游戏状态
        if (this.gameState !== 'idle') {
            return;
        }

        // 检查鱼饵配置（过滤掉null和undefined）
        const configuredBaits = GameState.selectedBaits.filter(b => b);
        
        if (configuredBaits.length === 0) {
            this.setClaireExpression('pleading');
            return;
        }

        // 检查鱼饵库存
        const baitNeeded = {};
        configuredBaits.forEach(bait => {
            baitNeeded[bait] = (baitNeeded[bait] || 0) + 1;
        });

        for (const [bait, count] of Object.entries(baitNeeded)) {
            if (GameState.baitInventory[bait] < count) {
                this.setClaireExpression('pleading');
                return;
            }
        }

        // 清理之前的状态
        this.clearWaveState();

        // 开始钓鱼
        this.gameState = 'waiting';
        this.fishBtn.setVisible(false);
        this.setClaireExpression('nervous');

        // 显示浮标
        this.floatContainer.setVisible(true);
        this.floatContainer.setAlpha(1);
        
        // 浮标浮动动画
        const baseY = 520;
        this.floatContainer.y = baseY;
        
        this.floatTween = this.tweens.add({
            targets: this.floatContainer,
            y: { from: baseY, to: baseY + 8 },
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 绘制鱼线
        this.updateFishingLine();

        // 开始水波纹
        this.wavePhase = 0;
        this.startWaveSequence();
    }

    updateFishingLine() {
        // 检查浮标是否可见且活跃
        if (!this.floatContainer || !this.floatContainer.active) return;
        if (!this.floatContainer.visible && this.floatContainer.alpha <= 0) return;
        
        this.fishingLine.clear();
        this.fishingLine.lineStyle(1.5, 0xFFFFFF, 0.7);
        
        const rodTipX = this.cameras.main.width / 2 - 80 + 140;
        const rodTipY = 350 - 210;
        const floatX = this.floatContainer.x;
        const floatY = this.floatContainer.y - 25;
        
        const midX = (rodTipX + floatX) / 2;
        const midY = (rodTipY + floatY) / 2 + 30;

        // 使用点模拟二次贝塞尔曲线
        const points = [];
        for (let t = 0; t <= 1; t += 0.1) {
            const x = (1-t)*(1-t)*rodTipX + 2*(1-t)*t*midX + t*t*floatX;
            const y = (1-t)*(1-t)*rodTipY + 2*(1-t)*t*midY + t*t*floatY;
            points.push({ x, y });
        }

        this.fishingLine.clear();
        this.fishingLine.lineStyle(2, 0xCCCCCC);
        this.fishingLine.fillPoints(points, true);
    }

    clearWaveState() {
        // 停止定时器
        if (this.waveTimer) {
            this.waveTimer.remove();
            this.waveTimer = null;
        }

        // 停止浮标动画
        if (this.floatTween && this.floatTween.isPlaying()) {
            this.floatTween.stop();
            this.floatTween = null;
        }

        // 清理波纹
        if (this.waveRings) {
            this.waveRings.forEach(ring => {
                if (ring && ring.graphic && ring.graphic.active) {
                    ring.graphic.clear();
                }
                ring.active = false;
            });
        }

        this.wavePhase = 0;
    }

    startWaveSequence() {
        const waveColors = [0x0088FF, 0xFFAA00, 0x00FF00, 0xFF0000];
        const waveDelays = [1800, 1800, 1800, 1800];
        
        // 使用箭头函数确保this绑定
        const showNextWave = () => {
            // 检查游戏状态是否已被重置
            if (this.gameState !== 'waiting') return;
            
            if (this.wavePhase >= 4) {
                this.fishEscaped();
                return;
            }

            const ring = this.waveRings[this.wavePhase];
            const color = waveColors[this.wavePhase];
            
            // 确保浮标位置正确
            if (!this.floatContainer || !this.floatContainer.active) return;
            
            ring.graphic.clear();
            ring.graphic.lineStyle(4, color, 0.8);
            ring.graphic.strokeCircle(0, 0, 25);
            ring.active = true;
            ring.graphic.x = this.floatContainer.x;
            ring.graphic.y = this.floatContainer.y;

            this.tweens.add({
                targets: ring.graphic,
                scaleX: 3.5,
                scaleY: 3.5,
                alpha: 0,
                duration: 1400,
                onComplete: () => {
                    if (ring.graphic.active) {
                        ring.graphic.clear();
                        ring.graphic.setScale(1);
                        ring.graphic.setAlpha(1);
                    }
                    ring.active = false;
                }
            });

            this.wavePhase++;

            if (this.wavePhase === 3) {
                // 三波时检查是否有鱼上钩
                this.time.delayedCall(400, () => {
                    if (this.gameState === 'waiting') {
                        this.checkFishBite();
                    }
                });
            } else {
                this.waveTimer = this.time.delayedCall(waveDelays[this.wavePhase - 1], showNextWave);
            }
        };

        // 立即开始第一波
        showNextWave();
    }

    checkFishBite() {
        const scene = SCENES[GameState.currentScene];
        this.hookedResults = [];

        // 检查救助模式 - 金钱低于80时触发
        const isLowMoney = GameState.money < 80;

        // 检查救助模式
        GameState.rescueMode = isLowMoney;

        // 连击5次以上触发金鱼奖励
        const comboBonusChance = GameState.combo >= 5 ? 0.20 : 0;

        // 金鱼奖励触发（优先使用已获得的奖励，否则随机触发）
        let triggerGoldfish = false;
        if (GameState.goldfishBonus) {
            triggerGoldfish = true;
            GameState.goldfishBonus = false; // 使用奖励
        } else if (Math.random() < comboBonusChance) {
            triggerGoldfish = true;
        } else if (isLowMoney && Math.random() < 0.15) {
            triggerGoldfish = true;
        }

        // 找到第一个有鱼饵的槽位来放金鱼
        const goldfishSlot = triggerGoldfish ? GameState.selectedBaits.findIndex(b => b !== null && b !== undefined) : -1;

        GameState.selectedBaits.forEach((baitType, slotIndex) => {
            if (!baitType) return;

            if (Math.random() < scene.trashRate) {
                const trashKeys = Object.keys(TRASH_DATA);
                const trashKey = trashKeys[Math.floor(Math.random() * trashKeys.length)];
                this.hookedResults.push({
                    slotIndex, baitType, type: 'trash', data: TRASH_DATA[trashKey]
                });
                return;
            }

            // 如果这个槽位是金鱼奖励槽，直接添加金鱼
            if (slotIndex === goldfishSlot) {
                const goldfish = FISH_DATA['gold_fish'];
                this.hookedResults.push({
                    slotIndex, baitType, type: 'fish', data: { ...goldfish, weight: goldfish.weightMin }
                });
                return;
            }

            const availableFish = scene.fishTypes
                .map(fishId => FISH_DATA[fishId])
                .filter(fish => fish && fish.baits.includes(baitType));

            if (availableFish.length > 0 && Math.random() < 0.85) {
                const fish = availableFish[Math.floor(Math.random() * availableFish.length)];
                const weight = parseFloat((Math.random() * (fish.weightMax - fish.weightMin) + fish.weightMin).toFixed(1));

                this.hookedResults.push({
                    slotIndex, baitType, type: 'fish', data: { ...fish, weight }
                });
            }
        });

        const hookedFishes = this.hookedResults.filter(r => r.type === 'fish');

        if (hookedFishes.length === 0) {
            this.handleNoFish();
        } else {
            this.startBattle(hookedFishes);
        }
    }

    startBattle(hookedFishes) {
        this.gameState = 'battle';
        this.setClaireExpression('struggling');

        const rod = RODS[GameState.currentRod];

        // 检查鱼竿承重
        let totalWeight = 0;
        let maxSingleWeight = 0;
        hookedFishes.forEach(hook => {
            totalWeight += hook.data.weight;
            if (hook.data.weight > maxSingleWeight) {
                maxSingleWeight = hook.data.weight;
            }
        });

        // 断竿判定
        if (maxSingleWeight > rod.singleMaxWeight || totalWeight > rod.totalMaxWeight) {
            this.handleRodBreak(hookedFishes);
            return;
        }

        let rawTotal = 0;
        hookedFishes.forEach(hook => {
            const baitBonus = BAITS[hook.baitType].clickBonus;
            rawTotal += Math.max(1, hook.data.clicks3s - baitBonus);
        });

        const afterRod = Math.round(rawTotal * (1 - rod.multiFishBonus));

        const comboBonus = this.getComboBonus();
        const finalTarget = Math.max(3, Math.round(afterRod * (1 - comboBonus)));

        this.battleState = {
            hookedFishes, rawTotal, finalTarget,
            playerClicks: 0, timeLeft: GAME_CONFIG.battleTime, startTime: Date.now()
        };

        this.showBattleUI();
    }

    handleRodBreak(hookedFishes) {
        this.gameState = 'idle';
        this.setClaireExpression('sad');
        this.showResult(`💔 竿子断了！\n鱼太重了！\n-¥30`, false);

        GameState.combo = 0;

        // 扣钱惩罚
        GameState.money = Math.max(0, GameState.money - 30);

        // 消耗鱼饵
        GameState.selectedBaits.forEach(bait => {
            if (bait) GameState.baitInventory[bait]--;
        });

        this.resetFishing();
    }

    getComboBonus() {
        if (GameState.combo >= 10) return 0.20;
        if (GameState.combo >= 7) return 0.15;
        if (GameState.combo >= 5) return 0.10;
        if (GameState.combo >= 3) return 0.05;
        return 0;
    }

    showBattleUI() {
        const cx = this.cameras.main.width / 2;

        this.battleContainer = this.add.container(cx, 380);

        const bg = this.add.rectangle(0, 0, 400, 320, 0x000000, 0.95);
        bg.setStrokeStyle(4, 0xFFD700);
        this.battleContainer.add(bg);

        this.battleContainer.add(this.add.text(0, -130, '⚡ 快速点击！⚡', {
            fontSize: '32px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
        }).setOrigin(0.5));

        let yOffset = -80;
        this.battleState.hookedFishes.forEach(hook => {
            this.battleContainer.add(this.add.text(0, yOffset, 
                `🐟 ${hook.data.name} ${hook.data.weight}kg`, {
                fontSize: '20px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
            }).setOrigin(0.5));
            yOffset += 32;
        });

        this.targetText = this.add.text(0, 10, `目标: ${this.battleState.finalTarget}次`, {
            fontSize: '28px', fontFamily: 'Microsoft YaHei', color: '#00FF00'
        }).setOrigin(0.5);
        this.battleContainer.add(this.targetText);

        this.clickText = this.add.text(0, 55, '点击: 0', {
            fontSize: '40px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5);
        this.battleContainer.add(this.clickText);

        this.timeText = this.add.text(0, 105, `⏱️ ${this.battleState.timeLeft.toFixed(1)}s`, {
            fontSize: '28px', fontFamily: 'Microsoft YaHei', color: '#FF6347'
        }).setOrigin(0.5);
        this.battleContainer.add(this.timeText);

        const clickArea = this.add.rectangle(0, 0, 400, 320, 0x000000, 0);
        this.battleContainer.add(clickArea);
        clickArea.setInteractive();

        clickArea.on('pointerdown', () => {
            this.battleState.playerClicks++;
            this.clickText.setText(`点击: ${this.battleState.playerClicks}`);
            this.tweens.add({ targets: this.clickText, scale: 1.2, duration: 50, yoyo: true });
        });

        this.battleTimer = this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                const elapsed = (Date.now() - this.battleState.startTime) / 1000;
                this.battleState.timeLeft = Math.max(0, GAME_CONFIG.battleTime - elapsed);
                this.timeText.setText(`⏱️ ${this.battleState.timeLeft.toFixed(1)}s`);

                if (this.battleState.timeLeft <= 0) {
                    this.endBattle();
                }
            }
        });
    }

    endBattle() {
        if (this.battleTimer) {
            this.battleTimer.remove();
            this.battleTimer = null;
        }
        this.battleContainer.destroy();

        const success = this.battleState.playerClicks >= this.battleState.finalTarget;

        if (success) {
            this.handleBattleSuccess();
        } else {
            this.handleBattleFail();
        }
    }

    handleBattleSuccess() {
        const hookedFishes = this.battleState.hookedFishes;
        let totalValue = 0;

        hookedFishes.forEach(hook => {
            const fish = hook.data;
            const value = Math.round(fish.value * fish.weight);
            totalValue += value;

            const sceneId = GameState.currentScene;
            const currentBest = GameState.sceneProgress[sceneId].bestWeights[fish.id] || 0;
            if (fish.weight > currentBest) {
                GameState.sceneProgress[sceneId].bestWeights[fish.id] = fish.weight;
            }

            this.checkSceneUnlock(fish);
        });

        GameState.combo++;

        // 连击达到5次时，有20%概率获得下一次金鱼奖励
        if (GameState.combo >= 5 && !GameState.goldfishBonus) {
            if (Math.random() < 0.20) {
                GameState.goldfishBonus = true;
            }
        }

        const comboBonus = this.getComboBonusValue();
        totalValue = Math.round(totalValue * (1 + comboBonus));

        GameState.money += totalValue;
        GameState.totalCaught += hookedFishes.length;

        GameState.selectedBaits.forEach(bait => {
            if (bait) GameState.baitInventory[bait]--;
        });

        // 显示金鱼奖励提示
        if (GameState.goldfishBonus) {
            this.showResult(`🎉 钓起${hookedFishes.length}条鱼！\n+¥${totalValue}\n✨ 下次钓鱼必定钓到金鱼！`, true);
        } else {
            this.setClaireExpression(hookedFishes.length > 1 ? 'excited' : 'happy');
            this.showResult(`🎉 钓起${hookedFishes.length}条鱼！\n+¥${totalValue}`, true);
        }
    }

    getComboBonusValue() {
        if (GameState.combo >= 10) return 0.5;
        if (GameState.combo >= 7) return 0.3;
        if (GameState.combo >= 5) return 0.2;
        if (GameState.combo >= 3) return 0.1;
        return 0;
    }

    handleBattleFail() {
        GameState.combo = 0;
        GameState.selectedBaits.forEach(bait => {
            if (bait) GameState.baitInventory[bait]--;
        });

        this.setClaireExpression('sad');
        const shortBy = this.battleState.finalTarget - this.battleState.playerClicks;
        this.showResult(`💨 鱼跑了...\n还差${shortBy}次！`, false);
    }

    handleNoFish() {
        GameState.combo = 0;
        let totalPenalty = 0;
        let caughtTrashCount = 0;
        let trashMessages = [];
        let caughtSnake = false;
        let caughtShoe = false;
        let caughtCan = false;

        this.hookedResults.forEach(result => {
            if (result.type === 'trash') {
                caughtTrashCount++;
                totalPenalty += result.data.penalty;
                trashMessages.push(`${result.data.name}！`);
                if (result.data.id === 'snake') caughtSnake = true;
                if (result.data.id === 'shoe') caughtShoe = true;
                if (result.data.id === 'can') caughtCan = true;
            }
        });

        // 根据垃圾类型显示不同表情
        if (caughtSnake) {
            this.setClaireExpression('scared');
            this.showResult(`😱 钓到蛇了！\n${trashMessages.join('\n')}\n-¥${totalPenalty}`, false);
        } else if (caughtShoe) {
            this.setClaireExpression('disgusted');
            this.showResult(`🤢 钓到破鞋！\n${trashMessages.join('\n')}\n-¥${totalPenalty}`, false);
        } else if (caughtCan) {
            this.setClaireExpression('disgusted');
            this.showResult(`😒 钓到破罐头！\n${trashMessages.join('\n')}\n-¥${totalPenalty}`, false);
        } else if (caughtTrashCount > 0) {
            this.setClaireExpression('sad');
            this.showResult(`😢 钓到垃圾...\n${trashMessages.join('\n')}\n-¥${totalPenalty}`, false);
        } else {
            // 完全没有东西上钩，不消耗鱼饵
            this.setClaireExpression('sad');
            this.showResult(`😢 没有鱼上钩...`, false);
        }

        if (caughtTrashCount > 0) {
            // 有垃圾上钩，消耗鱼饵
            if (totalPenalty > 0) {
                GameState.money -= totalPenalty;
                if (GameState.money < 0) GameState.money = 0;
            }
            GameState.selectedBaits.forEach(bait => {
                if (bait) GameState.baitInventory[bait]--;
            });
        }

        this.resetFishing();
    }

    fishEscaped() {
        GameState.combo = 0;
        // 鱼跑了但没上钩，不消耗鱼饵
        this.setClaireExpression('sad');
        this.showResult(`💨 鱼跑了...\n再接再厉！`, false);
        // 重要：重置钓鱼状态
        this.resetFishing();
    }

    checkSceneUnlock(fish) {
        for (const [sceneId, scene] of Object.entries(SCENES)) {
            if (scene.unlocked || !scene.unlockRequirement) continue;

            const req = scene.unlockRequirement;
            if (fish.id === req.fishType && fish.weight >= req.minWeight) {
                SCENES[sceneId].unlocked = true;
                GameState.sceneProgress[sceneId].unlocked = true;
                this.showSceneUnlock(sceneId, fish);
                break;
            }
        }

        // 检查深渊裂缝完成条件（捕获深渊鱼王）
        if (fish.id === 'abyss_king') {
            GameState.sceneProgress.abyssRift.completionCount++;
            this.checkGameCompletion();
        }
    }

    checkGameCompletion() {
        const scene = SCENES.abyssRift;
        if (!scene.isFinalStage || !scene.completionRequirement) return;

        const count = GameState.sceneProgress.abyssRift.completionCount;
        const required = scene.completionRequirement.count;

        if (count >= required) {
            this.showGameCompletion();
        }
    }

    showGameCompletion() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        const container = this.add.container(0, 0);
        container.setDepth(200);

        // 半透明背景遮罩
        const overlay = this.add.rectangle(cx, cy, 480, 854, 0x000000, 0.6);
        overlay.setOrigin(0.5);
        container.add(overlay);

        // 弹窗背景
        const modalW = 380;
        const modalH = 450;
        const modalY = cy - 50;
        const modalBg = this.add.rectangle(cx, modalY, modalW, modalH, 0x1a1a2e);
        modalBg.setOrigin(0.5);
        modalBg.setStrokeStyle(4, 0xFFD700);
        container.add(modalBg);

        // 克莱尔容器
        const claire = this.add.container(cx - 80, modalY - 100);
        container.add(claire);

        // 头发
        claire.add(this.add.ellipse(-45, -35, 35, 55, 0x8B4513));
        claire.add(this.add.ellipse(45, -35, 35, 55, 0x8B4513));
        claire.add(this.add.ellipse(0, -45, 70, 45, 0x8B4513));

        // 脸
        claire.add(this.add.circle(0, 0, 50, 0xFFDBAC));

        // 眼睛 - 开心眯眼
        const eyeL = this.add.circle(-18, -3, 8, 0x000000);
        const eyeR = this.add.circle(18, -3, 8, 0x000000);
        claire.add(eyeL);
        claire.add(eyeR);

        // 腮红
        claire.add(this.add.circle(-32, 12, 9, 0xFFB6C1, 0.7));
        claire.add(this.add.circle(32, 12, 9, 0xFFB6C1, 0.7));

        // 嘴巴 - 微笑
        const mouth = this.add.arc(0, 15, 15, 20, 160, false, 0xFF69B4);
        mouth.setStrokeStyle(3, 0xFF69B4);
        claire.add(mouth);

        // 身体
        claire.add(this.add.ellipse(0, 65, 70, 55, 0xFF69B4));

        // 鱼竿
        const rod = this.add.graphics();
        rod.lineStyle(6, 0x8B4513);
        rod.lineBetween(-40, 20, 60, -120);
        rod.lineStyle(4, 0xA0522D);
        rod.lineBetween(-40, 20, 60, -120);
        rod.lineStyle(2, 0xD2691E);
        rod.lineBetween(60, -120, 80, -150);
        claire.add(rod);

        // 鱼线
        const line = this.add.graphics();
        line.lineStyle(2, 0xCCCCCC);
        line.lineBetween(80, -150, 80, -200);
        claire.add(line);

        // 胜利手势 - 左手比耶
        const handL = this.add.container(-70, 30);
        handL.add(this.add.circle(0, 0, 12, 0xFFDBAC));
        handL.add(this.add.ellipse(-5, -15, 6, 20, 0xFFDBAC));
        handL.add(this.add.ellipse(5, -15, 6, 20, 0xFFDBAC));
        claire.add(handL);

        // 右手握竿
        const handR = this.add.container(20, 10);
        handR.add(this.add.circle(0, 0, 12, 0xFFDBAC));
        handR.add(this.add.ellipse(8, -8, 6, 15, 0xFFDBAC));
        handR.add(this.add.ellipse(8, 5, 6, 15, 0xFFDBAC));
        claire.add(handR);

        // 胜利文字
        const vText = this.add.text(0, -100, '✌️', { fontSize: '40px' });
        claire.add(vText);

        // 动画 - 克莱尔弹跳
        this.tweens.add({
            targets: claire,
            y: modalY - 120,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 动画 - 胜利手势闪烁
        this.tweens.add({
            targets: vText,
            scale: { from: 1, to: 1.3 },
            alpha: { from: 1, to: 0.7 },
            duration: 400,
            yoyo: true,
            repeat: -1
        });

        // 动画 - 眼睛眯起
        this.tweens.add({
            targets: [eyeL, eyeR],
            scaleY: { from: 1, to: 0.5 },
            duration: 300,
            yoyo: true,
            repeat: -1
        });

        // 标题
        container.add(this.add.text(cx, modalY - 160, '🏆', { fontSize: '60px' }).setOrigin(0.5));
        container.add(this.add.text(cx, modalY - 100, '恭喜通关！', {
            fontSize: '32px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
        }).setOrigin(0.5));

        container.add(this.add.text(cx, modalY - 55, '你已捕获3条深渊鱼王', {
            fontSize: '16px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5));

        container.add(this.add.text(cx, modalY - 25, '成为真正的钓鱼大师！', {
            fontSize: '14px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
        }).setOrigin(0.5));

        // 统计信息
        const stats = `💰 金币: ¥${GameState.money}\n🐟 累计捕获: ${GameState.totalCaught}条\n🔥 最高连击: ${GameState.combo}`;
        container.add(this.add.text(cx, modalY + 30, stats, {
            fontSize: '14px', fontFamily: 'Microsoft YaHei', color: '#00FF00',
            align: 'center', lineSpacing: 8
        }).setOrigin(0.5));

        // 继续游戏按钮
        const btnBg = this.add.rectangle(cx, modalY + 100, 150, 45, 0x4169E1);
        btnBg.setStrokeStyle(2, 0xFFFFFF);
        container.add(btnBg);
        container.add(this.add.text(cx, modalY + 100, '继续游戏', {
            fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5));

        btnBg.setInteractive();
        btnBg.on('pointerdown', () => {
            container.destroy();
        });
    }

    showSceneUnlock(sceneId, fish) {
        const scene = SCENES[sceneId];
        const cx = this.cameras.main.width / 2;
        
        const container = this.add.container(cx, this.cameras.main.height / 2);
        
        const bg = this.add.rectangle(0, 0, 420, 350, 0x000000, 0.97);
        bg.setStrokeStyle(4, 0xFFD700);
        container.add(bg);

        container.add(this.add.text(0, -140, '✨ 恭喜解锁新场景！✨', {
            fontSize: '30px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
        }).setOrigin(0.5));

        container.add(this.add.text(0, -70, scene.icon, { fontSize: '70px' }).setOrigin(0.5));
        container.add(this.add.text(0, 0, scene.name, {
            fontSize: '36px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5));
        container.add(this.add.text(0, 55, `🐟 ${fish.name} ${fish.weight}kg`, {
            fontSize: '24px', fontFamily: 'Microsoft YaHei', color: '#00FF00'
        }).setOrigin(0.5));
        container.add(this.add.text(0, 100, '满足了解锁条件！', {
            fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
        }).setOrigin(0.5));

        const btnBg = this.add.rectangle(0, 150, 160, 50, 0x4169E1);
        btnBg.setStrokeStyle(2, 0xFFFFFF);
        container.add(btnBg);
        container.add(this.add.text(0, 150, '立即进入', {
            fontSize: '22px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5));

        btnBg.setInteractive();
        btnBg.on('pointerdown', () => {
            container.destroy();
            GameState.currentScene = sceneId;
            GameState.firstEnterScene[sceneId] = true;
            this.scene.restart();
        });

        container.setDepth(100);
    }

    showResult(text, success) {
        const cx = this.cameras.main.width / 2;
        const container = this.add.container(cx, 380);
        
        const bg = this.add.rectangle(0, 0, 360, 160, 0x000000, 0.95);
        bg.setStrokeStyle(4, success ? 0x00FF00 : 0xFF0000);
        container.add(bg);

        container.add(this.add.text(0, 0, text, {
            fontSize: '24px', fontFamily: 'Microsoft YaHei', 
            color: success ? '#00FF00' : '#FF6347', align: 'center'
        }).setOrigin(0.5));

        container.setDepth(100);

        this.time.delayedCall(2000, () => {
            container.destroy();
            this.resetFishing();
        });
    }

    resetFishing() {
        this.gameState = 'idle';
        this.clearWaveState();
        this.hookedResults = [];
        this.battleState = null;

        this.floatContainer.setVisible(false);
        this.floatContainer.y = 520;
        this.fishingLine.clear();
        this.fishBtn.setVisible(true);
        this.updateUI();

        // 检查游戏是否失败
        if (isGameOver()) {
            this.showGameOver();
        }
    }

    showGameOver() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        const container = this.add.container(0, 0);
        container.setDepth(300);

        // 半透明背景遮罩
        const overlay = this.add.rectangle(cx, cy, 480, 854, 0x000000, 0.6);
        overlay.setOrigin(0.5);
        container.add(overlay);

        // 弹窗背景
        const modalW = 360;
        const modalH = 420;
        const modalY = cy - 30;
        const modalBg = this.add.rectangle(cx, modalY, modalW, modalH, 0x1a1a2e);
        modalBg.setOrigin(0.5);
        modalBg.setStrokeStyle(4, 0xFF6347);
        container.add(modalBg);

        // 克莱尔哭泣表情
        const claire = this.add.container(cx - 70, modalY - 100);
        container.add(claire);

        // 头发
        claire.add(this.add.ellipse(-45, -35, 35, 55, 0x8B4513));
        claire.add(this.add.ellipse(45, -35, 35, 55, 0x8B4513));
        claire.add(this.add.ellipse(0, -45, 70, 45, 0x8B4513));

        // 脸
        claire.add(this.add.circle(0, 0, 50, 0xFFDBAC));

        // 哭泣的眼睛
        const eyeL = this.add.circle(-18, -5, 10, 0x000000);
        const eyeR = this.add.circle(18, -5, 10, 0x000000);
        claire.add(eyeL);
        claire.add(eyeR);

        // 眼泪
        const tearL = this.add.rectangle(-22, 10, 4, 12, 0x4169E1);
        const tearR = this.add.rectangle(22, 10, 4, 12, 0x4169E1);
        claire.add(tearL);
        claire.add(tearR);

        // 腮红
        claire.add(this.add.circle(-32, 12, 9, 0xFFB6C1, 0.6));
        claire.add(this.add.circle(32, 12, 9, 0xFFB6C1, 0.6));

        // 哭泣的嘴巴
        const mouth = this.add.arc(0, 22, 12, 30, 150, false, 0xFF69B4);
        mouth.setStrokeStyle(3, 0xFF69B4);
        claire.add(mouth);

        // 身体
        claire.add(this.add.ellipse(0, 65, 70, 55, 0xFF69B4));

        // 动画 - 眼泪流下
        this.tweens.add({
            targets: [tearL, tearR],
            y: '+=20',
            alpha: { from: 1, to: 0 },
            duration: 800,
            repeat: -1
        });

        // 动画 - 克莱尔微微晃动
        this.tweens.add({
            targets: claire,
            angle: { from: -3, to: 3 },
            duration: 300,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 游戏结束标题
        container.add(this.add.text(cx, modalY - 160, '💔', { fontSize: '60px' }).setOrigin(0.5));
        container.add(this.add.text(cx, modalY - 100, '游戏结束', {
            fontSize: '32px', fontFamily: 'Microsoft YaHei', color: '#FF6347'
        }).setOrigin(0.5));

        container.add(this.add.text(cx, modalY - 55, '没钱买鱼饵了...', {
            fontSize: '16px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5));

        container.add(this.add.text(cx, modalY - 25, '克莱尔也很无奈呢...', {
            fontSize: '14px', fontFamily: 'Microsoft YaHei', color: '#888888'
        }).setOrigin(0.5));

        // 统计信息
        const stats = `💰 金币: ¥${GameState.money}\n🐟 累计捕获: ${GameState.totalCaught}条\n🔥 最高连击: ${GameState.combo}`;
        container.add(this.add.text(cx, modalY + 25, stats, {
            fontSize: '14px', fontFamily: 'Microsoft YaHei', color: '#87CEEB',
            align: 'center', lineSpacing: 8
        }).setOrigin(0.5));

        // 重新开始按钮
        const btnBg = this.add.rectangle(cx, modalY + 90, 150, 45, 0xFF6347);
        btnBg.setStrokeStyle(2, 0xFFFFFF);
        container.add(btnBg);
        container.add(this.add.text(cx, modalY + 90, '重新开始', {
            fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5));

        btnBg.setInteractive();
        btnBg.on('pointerdown', () => {
            // 重置游戏状态
            GameState.money = GAME_CONFIG.initialMoney;
            GameState.currentScene = 'cherryBlossom';
            GameState.currentRod = 'bamboo';
            GameState.baitInventory = { bread: 10, worm: 0, shrimp: 0, glow: 0, gold: 0 };
            GameState.selectedBaits = [];
            GameState.combo = 0;
            GameState.totalCaught = 0;
            GameState.goldfishBonus = false;
            GameState.rescueMode = false;
            GameState.sceneProgress = {
                cherryBlossom: { unlocked: true, bestWeights: {} },
                moonlightLake: { unlocked: false, bestWeights: {} },
                azureCoast: { unlocked: false, bestWeights: {} },
                abyssRift: { unlocked: false, bestWeights: {}, completionCount: 0 }
            };
            GameState.unlockedRods = ['bamboo'];
            GameState.firstEnterScene = {
                cherryBlossom: true, moonlightLake: true,
                azureCoast: true, abyssRift: true
            };

            // 恢复场景解锁状态
            SCENES.moonlightLake.unlocked = false;
            SCENES.azureCoast.unlocked = false;
            SCENES.abyssRift.unlocked = false;

            this.scene.restart();
        });
    }

    update() {
        // 更新鱼线
        if (this.floatContainer && this.floatContainer.active && this.floatContainer.visible) {
            this.updateFishingLine();
        }
    }
}

// ==================== 商店场景 ====================
class ShopScene extends Phaser.Scene {
    constructor() { super({ key: 'ShopScene' }); }

    create() {
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.92).setOrigin(0);
        
        const cx = this.cameras.main.width / 2;

        this.add.text(cx, 40, '🏪 商店', {
            fontSize: '40px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
        }).setOrigin(0.5);

        this.moneyText = this.add.text(cx, 90, `💰 ¥${GameState.money}`, {
            fontSize: '26px', fontFamily: 'Microsoft YaHei', color: '#00FF00'
        }).setOrigin(0.5);

        const tabY = 140;
        this.baitTab = this.createTab(cx - 100, tabY, '鱼饵', true);
        this.rodTab = this.createTab(cx + 100, tabY, '钓竿', false);
        this.currentTab = 'bait';
        
        this.showBaitShop();

        this.createButton(cx, 790, '关闭', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        }, 120, 50);
    }

    createTab(x, y, text, active) {
        const btn = this.add.container(x, y);
        const bg = this.add.rectangle(0, 0, 120, 42, active ? 0x4169E1 : 0x333333);
        const label = this.add.text(0, 0, text, {
            fontSize: '22px', fontFamily: 'Microsoft YaHei', color: active ? '#FFFFFF' : '#888888'
        }).setOrigin(0.5);
        btn.add([bg, label]);
        
        btn.setInteractive(new Phaser.Geom.Rectangle(-60, -21, 120, 42), Phaser.Geom.Rectangle.Contains);
        
        btn.on('pointerdown', () => {
            if (text === '鱼饵' && this.currentTab !== 'bait') {
                this.currentTab = 'bait';
                this.baitTab.list[0].setFillStyle(0x4169E1);
                this.baitTab.list[1].setColor('#FFFFFF');
                this.rodTab.list[0].setFillStyle(0x333333);
                this.rodTab.list[1].setColor('#888888');
                this.showBaitShop();
            } else if (text === '钓竿' && this.currentTab !== 'rod') {
                this.currentTab = 'rod';
                this.rodTab.list[0].setFillStyle(0x4169E1);
                this.rodTab.list[1].setColor('#FFFFFF');
                this.baitTab.list[0].setFillStyle(0x333333);
                this.baitTab.list[1].setColor('#888888');
                this.showRodShop();
            }
        });
        
        return btn;
    }

    showBaitShop() {
        if (this.itemContainer) this.itemContainer.destroy();
        this.itemContainer = this.add.container(0, 0);

        const cx = this.cameras.main.width / 2;
        let y = 200;

        Object.values(BAITS).forEach((bait, i) => {
            const count = GameState.baitInventory[bait.id];
            const canBuy = GameState.money >= bait.price && count < bait.maxCount;

            this.itemContainer.add(this.add.rectangle(cx, y, 430, 75, i % 2 === 0 ? 0x222222 : 0x333333));

            this.itemContainer.add(this.add.text(45, y - 15, bait.name, {
                fontSize: '22px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
            }));

            this.itemContainer.add(this.add.text(45, y + 12, bait.description, {
                fontSize: '14px', fontFamily: 'Microsoft YaHei', color: '#888888'
            }));

            this.itemContainer.add(this.add.text(260, y - 5, `¥${bait.price}`, {
                fontSize: '20px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
            }));

            this.itemContainer.add(this.add.text(340, y - 5, `${count}/${bait.maxCount}`, {
                fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
            }));

            const buyBtn = this.add.container(410, y);
            const btnBg = this.add.rectangle(0, 0, 50, 38, canBuy ? 0x00AA00 : 0x666666);
            const btnText = this.add.text(0, 0, '+', {
                fontSize: '28px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
            }).setOrigin(0.5);
            buyBtn.add([btnBg, btnText]);
            this.itemContainer.add(buyBtn);

            if (canBuy) {
                buyBtn.setInteractive(new Phaser.Geom.Rectangle(-25, -19, 50, 38), Phaser.Geom.Rectangle.Contains);
                buyBtn.on('pointerdown', () => {
                    GameState.money -= bait.price;
                    GameState.baitInventory[bait.id]++;
                    this.moneyText.setText(`💰 ¥${GameState.money}`);
                    this.showBaitShop();
                });
            }

            y += 85;
        });
    }

    showRodShop() {
        if (this.itemContainer) this.itemContainer.destroy();
        this.itemContainer = this.add.container(0, 0);

        const cx = this.cameras.main.width / 2;
        let y = 200;

        Object.values(RODS).forEach((rod, i) => {
            const owned = GameState.unlockedRods.includes(rod.id);
            const current = GameState.currentRod === rod.id;
            const canBuy = !owned && GameState.money >= rod.price;

            const bg = this.add.rectangle(cx, y, 430, 95, i % 2 === 0 ? 0x222222 : 0x333333);
            if (current) bg.setStrokeStyle(3, 0xFFD700);
            this.itemContainer.add(bg);

            this.itemContainer.add(this.add.text(45, y - 28, rod.name, {
                fontSize: '24px', fontFamily: 'Microsoft YaHei', color: owned ? '#FFFFFF' : '#888888'
            }));

            this.itemContainer.add(this.add.text(45, y, `承重:${rod.singleMaxWeight}kg 槽位:${rod.slots} 加成:${Math.round(rod.multiFishBonus * 100)}%`, {
                fontSize: '15px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
            }));

            this.itemContainer.add(this.add.text(45, y + 25, rod.description, {
                fontSize: '13px', fontFamily: 'Microsoft YaHei', color: '#888888'
            }));

            if (current) {
                this.itemContainer.add(this.add.text(380, y, '使用中', {
                    fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#00FF00'
                }).setOrigin(0.5));
            } else if (owned) {
                const btn = this.createButton(380, y, '装备', () => {
                    GameState.currentRod = rod.id;
                    this.showRodShop();
                }, 80, 40);
                btn.setScale(0.9);
                this.itemContainer.add(btn);
            } else {
                this.itemContainer.add(this.add.text(360, y - 5, `¥${rod.price}`, {
                    fontSize: '20px', fontFamily: 'Microsoft YaHei', color: canBuy ? '#FFD700' : '#FF0000'
                }));

                if (canBuy) {
                    const btn = this.createButton(380, y + 28, '购买', () => {
                        GameState.money -= rod.price;
                        GameState.unlockedRods.push(rod.id);
                        this.moneyText.setText(`💰 ¥${GameState.money}`);
                        this.showRodShop();
                    }, 70, 35);
                    btn.setScale(0.85);
                    this.itemContainer.add(btn);
                }
            }

            y += 105;
        });
    }

    createButton(x, y, text, callback, w, h) {
        const btn = this.add.container(x, y);
        const bg = this.add.rectangle(0, 0, w, h, 0x4169E1);
        const label = this.add.text(0, 0, text, {
            fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5);
        btn.add([bg, label]);
        
        if (callback) {
            btn.setInteractive(new Phaser.Geom.Rectangle(-w/2, -h/2, w, h), Phaser.Geom.Rectangle.Contains);
            btn.on('pointerdown', callback);
        }
        
        return btn;
    }
}

// ==================== 配置场景 ====================
class ConfigScene extends Phaser.Scene {
    constructor() { super({ key: 'ConfigScene' }); }

    create() {
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.92).setOrigin(0);
        
        const cx = this.cameras.main.width / 2;
        const rod = RODS[GameState.currentRod];

        this.add.text(cx, 40, '⚙️ 配置鱼饵', {
            fontSize: '40px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
        }).setOrigin(0.5);

        this.add.text(cx, 95, `${rod.name} (${rod.slots}槽位)`, {
            fontSize: '24px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
        }).setOrigin(0.5);

        const configured = GameState.selectedBaits.filter(b => b).length;
        this.add.text(cx, 125, `已配置: ${configured}/${rod.slots} 槽`, {
            fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5);

        const slotY = 175;
        const spacing = 100;
        const startX = cx - ((rod.slots - 1) * spacing) / 2;

        for (let i = 0; i < rod.slots; i++) {
            const sx = startX + i * spacing;
            const container = this.add.container(sx, slotY);

            const bg = this.add.rectangle(0, 0, 85, 85, 0x333333);
            bg.setStrokeStyle(3, 0x666666);
            container.add(bg);

            container.add(this.add.text(0, -28, `槽${i + 1}`, {
                fontSize: '15px', fontFamily: 'Microsoft YaHei', color: '#888888'
            }).setOrigin(0.5));

            const current = GameState.selectedBaits[i];
            if (current) {
                const bait = BAITS[current];
                container.add(this.add.text(0, 5, bait.name, {
                    fontSize: '15px', fontFamily: 'Microsoft YaHei', color: '#00FF00'
                }).setOrigin(0.5));

                const clear = this.add.text(0, 32, '✕', {
                    fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#FF0000'
                }).setOrigin(0.5);
                clear.setInteractive();
                clear.on('pointerdown', () => {
                    GameState.selectedBaits[i] = null;
                    this.scene.restart();
                });
                container.add(clear);
            } else {
                container.add(this.add.text(0, 5, '空', {
                    fontSize: '18px', fontFamily: 'Microsoft YaHei', color: '#666666'
                }).setOrigin(0.5));
            }
        }

        let y = 300;
        Object.values(BAITS).forEach((bait, i) => {
            const count = GameState.baitInventory[bait.id];
            const hasEmpty = configured < rod.slots;

            this.add.rectangle(cx, y, 430, 65, i % 2 === 0 ? 0x222222 : 0x333333);

            this.add.text(45, y - 10, bait.name, {
                fontSize: '20px', fontFamily: 'Microsoft YaHei', color: count > 0 ? '#FFFFFF' : '#666666'
            });

            this.add.text(45, y + 15, `${bait.description} (-${bait.clickBonus}次)`, {
                fontSize: '13px', fontFamily: 'Microsoft YaHei', color: '#888888'
            });

            this.add.text(290, y, `库存: ${count}`, {
                fontSize: '18px', fontFamily: 'Microsoft YaHei', color: count > 0 ? '#87CEEB' : '#FF0000'
            });

            if (count > 0 && hasEmpty) {
                const btn = this.createButton(400, y, '配置', () => {
                    const emptyIdx = GameState.selectedBaits.findIndex(b => !b);
                    if (emptyIdx === -1) {
                        GameState.selectedBaits.push(bait.id);
                    } else {
                        GameState.selectedBaits[emptyIdx] = bait.id;
                    }
                    this.scene.restart();
                }, 70, 38);
                btn.bg.setScale(0.9);
            }

            y += 75;
        });

        this.createButton(cx, 790, '关闭', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        }, 120, 50);
    }

    createButton(x, y, text, callback, w, h) {
        // 创建按钮背景
        const bg = this.add.rectangle(x, y, w, h, 0x4169E1);
        bg.setStrokeStyle(2, 0xFFFFFF);
        
        // 创建按钮文字（不设置交互，让点击穿透到背景）
        const label = this.add.text(x, y, text, {
            fontSize: '16px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5);
        label.setDepth(1);
        
        // 只设置背景交互
        bg.setInteractive();
        bg.on('pointerover', () => bg.setFillStyle(0x6495ED));
        bg.on('pointerout', () => bg.setFillStyle(0x4169E1));
        bg.on('pointerdown', callback);
        
        // 返回统一格式的按钮对象
        return { bg, label, setVisible: (v) => { bg.setVisible(v); label.setVisible(v); } };
    }
}

// ==================== 场景选择场景 ====================
class SceneSelectScene extends Phaser.Scene {
    constructor() { super({ key: 'SceneSelectScene' }); }

    create() {
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.92).setOrigin(0);

        const cx = this.cameras.main.width / 2;

        this.add.text(cx, 40, '🌍 选择场景', {
            fontSize: '40px', fontFamily: 'Microsoft YaHei', color: '#FFD700'
        }).setOrigin(0.5);

        let y = 120;
        Object.values(SCENES).forEach((scene, i) => {
            const unlocked = scene.unlocked;
            const current = GameState.currentScene === scene.id;
            const isFinalStage = scene.isFinalStage;

            const bgHeight = isFinalStage ? 145 : 125;
            const bg = this.add.rectangle(cx, y, 430, bgHeight, current ? 0x4169E1 : (i % 2 === 0 ? 0x222222 : 0x333333));
            if (current) bg.setStrokeStyle(3, 0xFFD700);

            this.add.text(65, y - 25, scene.icon, { fontSize: '50px' }).setOrigin(0.5);

            this.add.text(160, y - 35, scene.name, {
                fontSize: '24px', fontFamily: 'Microsoft YaHei', color: unlocked ? '#FFFFFF' : '#666666'
            });

            if (unlocked) {
                // 显示可钓到的鱼类
                const fishNames = scene.fishTypes.map(fishId => FISH_DATA[fishId].name).join('、');
                this.add.text(160, y - 5, '🐟 ' + fishNames, {
                    fontSize: '11px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
                });

                this.add.text(390, y - 35, `垃圾率:${Math.round(scene.trashRate * 100)}%`, {
                    fontSize: '11px', fontFamily: 'Microsoft YaHei', color: '#FF6347'
                });

                // 显示通关进度（最后一关）
                if (isFinalStage && scene.completionRequirement) {
                    const req = scene.completionRequirement;
                    const fishData = FISH_DATA[req.fishType];
                    const progress = GameState.sceneProgress[scene.id];
                    const currentCount = progress.completionCount || 0;
                    const color = currentCount >= req.count ? '#00FF00' : '#FFD700';

                    this.add.text(160, y + 20, `🏆 通关进度:`, {
                        fontSize: '13px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
                    });
                    this.add.text(280, y + 20, `${fishData.name} ${currentCount}/${req.count}`, {
                        fontSize: '14px', fontFamily: 'Microsoft YaHei', color: color
                    });

                    if (current) {
                        this.add.text(390, y + 55, '当前', {
                            fontSize: '15px', fontFamily: 'Microsoft YaHei', color: '#00FF00'
                        });
                    } else {
                        const btn = this.createButton(390, y + 55, '前往', () => {
                            GameState.currentScene = scene.id;
                            GameState.firstEnterScene[scene.id] = true;
                            this.scene.stop();
                            this.scene.start('GameScene');
                        }, 80, 40);
                        btn.setScale(0.9);
                    }
                } else if (current) {
                    this.add.text(390, y + 20, '当前', {
                        fontSize: '15px', fontFamily: 'Microsoft YaHei', color: '#00FF00'
                    });
                } else {
                    const btn = this.createButton(390, y + 20, '前往', () => {
                        GameState.currentScene = scene.id;
                        GameState.firstEnterScene[scene.id] = true;
                        this.scene.stop();
                        this.scene.start('GameScene');
                    }, 80, 40);
                    btn.setScale(0.9);
                }
            } else {
                this.add.text(160, y + 15, '🔒 ' + scene.unlockRequirement.description, {
                    fontSize: '12px', fontFamily: 'Microsoft YaHei', color: '#FF0000'
                });

                const progress = GameState.sceneProgress[scene.id];
                if (progress && progress.bestWeights[scene.unlockRequirement.fishType]) {
                    const best = progress.bestWeights[scene.unlockRequirement.fishType];
                    this.add.text(390, y - 35, `最佳:${best}kg`, {
                        fontSize: '11px', fontFamily: 'Microsoft YaHei', color: '#87CEEB'
                    });
                }
            }

            y += isFinalStage ? 155 : 135;
        });

        this.createButton(cx, 790, '关闭', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        }, 120, 50);
    }

    createButton(x, y, text, callback, w, h) {
        // 创建按钮背景
        const bg = this.add.rectangle(x, y, w, h, 0x4169E1);
        bg.setStrokeStyle(2, 0xFFFFFF);
        
        // 创建按钮文字（不设置交互，让点击穿透到背景）
        const label = this.add.text(x, y, text, {
            fontSize: '16px', fontFamily: 'Microsoft YaHei', color: '#FFFFFF'
        }).setOrigin(0.5);
        label.setDepth(1);
        
        // 只设置背景交互
        bg.setInteractive();
        bg.on('pointerover', () => bg.setFillStyle(0x6495ED));
        bg.on('pointerout', () => bg.setFillStyle(0x4169E1));
        bg.on('pointerdown', callback);
        
        // 返回统一格式的按钮对象
        return { 
            bg, 
            label, 
            setVisible: (v) => { bg.setVisible(v); label.setVisible(v); },
            setScale: (s) => { bg.setScale(s); label.setScale(s); }
        };
    }
}

// ==================== Phaser 配置 ====================
const config = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.width,
    height: GAME_CONFIG.height,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [BootScene, GameScene, ShopScene, ConfigScene, SceneSelectScene]
};

// ==================== 启动游戏 ====================
const game = new Phaser.Game(config);
