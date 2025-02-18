document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('avatarCanvas');
    const ctx = canvas.getContext('2d');
    const generateBtn = document.getElementById('generate-btn');
    const randomizeBtn = document.getElementById('randomize-btn');
    const downloadBtn = document.getElementById('download-btn');
    const styleSelect = document.getElementById('styleSelect');
    const bgColorInput = document.getElementById('bgColor');
    const primaryColorInput = document.getElementById('primaryColor');
    const complexityInput = document.getElementById('complexity');
    const rotationInput = document.getElementById('rotation');
    const animateCheckbox = document.getElementById('animate');
    const languageSelect = document.getElementById('language');
    const colorfulnessInput = document.getElementById('colorfulness');
    const colorfulnessValue = document.getElementById('colorfulnessValue');
    
    let animationFrame;
    let rotation = 0;

    // 设置画布大小
    canvas.width = 800;
    canvas.height = 800;

    // 设置画布的显示大小（通过CSS）
    canvas.style.width = '400px';   // 保持显示大小不变
    canvas.style.height = '400px';  // 保持显示大小不变

    // 获取滑块和显示数值的元素
    const complexitySlider = document.getElementById('complexity');
    const complexityValue = document.getElementById('complexityValue');
    const rotationSlider = document.getElementById('rotation');
    const rotationValue = document.getElementById('rotationValue');

    // 监听复杂度滑块的变化
    complexitySlider.addEventListener('input', function() {
        // 格式化显示为两位小数
        complexityValue.textContent = Number(this.value).toFixed(2);
    });

    // 监听旋转角度滑块的变化
    rotationSlider.addEventListener('input', function() {
        // 格式化显示为两位小数
        const value = Number(this.value);
        rotationValue.textContent = value.toFixed(0).padStart(3, ' ') + '°';
    });

    // 监听色彩丰富度滑块的变化
    colorfulnessInput.addEventListener('input', function() {
        // 格式化显示为两位小数
        colorfulnessValue.textContent = Number(this.value).toFixed(2);
    });

    // 设置初始值
    complexityValue.textContent = Number(complexitySlider.value).toFixed(2);
    rotationValue.textContent = Number(rotationSlider.value).toFixed(0).padStart(3, ' ') + '°';
    colorfulnessValue.textContent = Number(colorfulnessInput.value).toFixed(2);

    // 添加预设的配色方案
    const colorSchemes = [
        // 经典配色
        { bg: '#FFFFFF', primary: '#4A90E2' },  // 清新蓝白
        { bg: '#F8F9FA', primary: '#6C63FF' },  // 科技紫
        { bg: '#FFF5E6', primary: '#FF6B6B' },  // 暖阳红
        { bg: '#F0F7F4', primary: '#48B2A0' },  // 森林绿
        
        // 现代简约
        { bg: '#F7F7F7', primary: '#2D3748' },  // 商务灰
        { bg: '#FFFFFF', primary: '#805AD5' },  // 优雅紫
        { bg: '#F5F3FF', primary: '#4C1D95' },  // 深邃紫
        { bg: '#FAFAFA', primary: '#3B82F6' },  // 天际蓝
        
        // 柔和渐变色调
        { bg: '#FFF0F3', primary: '#FF8BA7' },  // 樱花粉
        { bg: '#F3F0FF', primary: '#9F7AEA' },  // 薰衣草
        { bg: '#E6FFFA', primary: '#38B2AC' },  // 薄荷绿
        { bg: '#FFFBEB', primary: '#F59E0B' },  // 向日葵
        
        // 高级灰系列
        { bg: '#F8FAFC', primary: '#475569' },  // 石墨灰
        { bg: '#F1F5F9', primary: '#334155' },  // 青石灰
        { bg: '#FAFAFA', primary: '#525252' },  // 中性灰
        { bg: '#F4F4F5', primary: '#3F3F46' },  // 深邃灰
        
        // 自然色彩
        { bg: '#ECFEFF', primary: '#06B6D4' },  // 海洋蓝
        { bg: '#FEF2F2', primary: '#EF4444' },  // 珊瑚红
        { bg: '#F0FDF4', primary: '#22C55E' },  // 翠叶绿
        { bg: '#FFF7ED', primary: '#EA580C' },  // 落日橙
        
        // 高对比组合
        { bg: '#18181B', primary: '#22D3EE' },  // 霓虹蓝
        { bg: '#0F172A', primary: '#818CF8' },  // 星空紫
        { bg: '#0C0A09', primary: '#FCD34D' },  // 金黑
        { bg: '#1C1917', primary: '#FB7185' },  // 玫瑰夜
        
        // 糖果色系
        { bg: '#FCE7F3', primary: '#EC4899' },  // 糖果粉
        { bg: '#F0FDFA', primary: '#2DD4BF' },  // 薄荷糖
        { bg: '#FDF4FF', primary: '#D946EF' },  // 葡萄糖
        { bg: '#FEF3C7', primary: '#F59E0B' },  // 蜜糖橙
        
        // 复古色调
        { bg: '#FDF2F8', primary: '#BE185D' },  // 复古玫瑰
        { bg: '#ECFDF5', primary: '#047857' },  // 复古绿
        { bg: '#EFF6FF', primary: '#1D4ED8' },  // 牛仔蓝
        { bg: '#FFFBF1', primary: '#92400E' },  // 复古棕
        
        // 科技感
        { bg: '#0F172A', primary: '#38BDF8' },  // 科幻蓝
        { bg: '#18181B', primary: '#A855F7' },  // 赛博紫
        { bg: '#020617', primary: '#60A5FA' },  // 深空蓝
        { bg: '#0A0A0A', primary: '#4ADE80' },  // 矩阵绿
        
        // 艺术感
        { bg: '#FFF1F2', primary: '#E11D48' },  // 艺术红
        { bg: '#F5F3FF', primary: '#7C3AED' },  // 创意紫
        { bg: '#F0F9FF', primary: '#0284C7' },  // 水彩蓝
        { bg: '#F8FAFC', primary: '#0F766E' },  // 青铜绿
        
        // 温暖色系
        { bg: '#FFF7ED', primary: '#C2410C' },  // 暖阳橙
        { bg: '#FFFBEB', primary: '#B45309' },  // 金秋黄
        { bg: '#FEF2F2', primary: '#B91C1C' },  // 朱砂红
        { bg: '#FAF5FF', primary: '#7E22CE' },  // 暖紫
        
        // 冷色调
        { bg: '#F0FDFA', primary: '#0F766E' },  // 青玉
        { bg: '#F0F9FF', primary: '#075985' },  // 深海蓝
        { bg: '#F1F5F9', primary: '#334155' },  // 石板灰
        { bg: '#F8FAFC', primary: '#1E293B' },  // 墨灰
        
        // 明亮色彩
        { bg: '#FFFFFF', primary: '#F43F5E' },  // 亮珊瑚
        { bg: '#FFFFFF', primary: '#8B5CF6' },  // 亮紫
        { bg: '#FFFFFF', primary: '#10B981' },  // 翡翠绿
        { bg: '#FFFFFF', primary: '#3B82F6' },   // 天空蓝
        
        // 深色主题
        { bg: '#000000', primary: '#FF3366' },  // 霓虹粉
        { bg: '#111827', primary: '#60A5FA' },  // 深夜蓝
        { bg: '#0F172A', primary: '#34D399' },  // 极光绿
        { bg: '#18181B', primary: '#F472B6' },  // 霓虹紫
        { bg: '#1E1B4B', primary: '#38BDF8' },  // 深邃科技
        { bg: '#0C0A09', primary: '#F59E0B' },  // 暗金
        { bg: '#1C1917', primary: '#10B981' },  // 翠玉黑
        { bg: '#0F172A', primary: '#6366F1' },  // 星空蓝
        
        // 渐变色背景
        { bg: '#123456', primary: '#89CFF0' },  // 深海渐变
        { bg: '#654321', primary: '#FFB6C1' },  // 暖棕
        { bg: '#234567', primary: '#98FB98' },  // 森林夜
        { bg: '#452167', primary: '#DDA0DD' },  // 紫罗兰夜
        
        // 自然色彩扩展
        { bg: '#2F4F4F', primary: '#98FF98' },  // 深绿海
        { bg: '#800000', primary: '#FFD700' },  // 赤金
        { bg: '#191970', primary: '#87CEEB' },  // 午夜蓝
        { bg: '#556B2F', primary: '#90EE90' },  // 橄榄绿
        
        // 现代工业风
        { bg: '#2C3E50', primary: '#E74C3C' },  // 工业红
        { bg: '#34495E', primary: '#F1C40F' },  // 工业黄
        { bg: '#2C3E50', primary: '#3498DB' },  // 工业蓝
        { bg: '#34495E', primary: '#2ECC71' },  // 工业绿
        
        // 赛博朋克
        { bg: '#000000', primary: '#FF00FF' },  // 赛博粉
        { bg: '#0B0B0B', primary: '#00FF00' },  // 黑客绿
        { bg: '#100B2C', primary: '#FF3864' },  // 赛博红
        { bg: '#0D0221', primary: '#FF00FF' },  // 霓虹紫
        
        // 复古波普
        { bg: '#FF6B6B', primary: '#4ECDC4' },  // 珊瑚青
        { bg: '#45B7D1', primary: '#FFBE0B' },  // 海洋金
        { bg: '#96CEB4', primary: '#FF6B6B' },  // 薄荷珊瑚
        { bg: '#4A90E2', primary: '#FFD93D' },  // 天空金
        
        // 暗色优雅
        { bg: '#1A1A2E', primary: '#E94560' },  // 深夜红
        { bg: '#16213E', primary: '#38E54D' },  // 深夜绿
        { bg: '#0F3460', primary: '#FFA500' },  // 深夜橙
        { bg: '#252B48', primary: '#FF4C29' },  // 深夜火
        
        // 明暗对比
        { bg: '#2C3333', primary: '#E7F6F2' },  // 暗灰白
        { bg: '#2C3639', primary: '#DCD7C9' },  // 深棕白
        { bg: '#27374D', primary: '#DDE6ED' },  // 深蓝白
        { bg: '#1B262C', primary: '#BBE1FA' },  // 午夜白
        
        // 自然深色
        { bg: '#2D4263', primary: '#C84B31' },  // 深蓝红
        { bg: '#1B2430', primary: '#51557E' },  // 深夜紫
        { bg: '#2C3639', primary: '#3F4E4F' },  // 深灰调
        { bg: '#1A120B', primary: '#3C2A21' },  // 深棕调
        
        // 高饱和对比
        { bg: '#FF0000', primary: '#00FF00' },  // 红绿
        { bg: '#0000FF', primary: '#FFFF00' },  // 蓝黄
        { bg: '#FF00FF', primary: '#00FFFF' },  // 紫青
        { bg: '#FF4500', primary: '#00CED1' },  // 橙蓝
        
        // 柔和大地色
        { bg: '#D7C0AE', primary: '#967E76' },  // 温柔棕
        { bg: '#EEE3CB', primary: '#B7B7B7' },  // 米灰
        { bg: '#D0B8A8', primary: '#85586F' },  // 玫瑰棕
        { bg: '#DFD3C3', primary: '#7D6E83' },  // 淡紫棕
        
        // 深邃宇宙
        { bg: '#150050', primary: '#3F0071' },  // 深紫星空
        { bg: '#000000', primary: '#3330E4' },  // 星际蓝
        { bg: '#1F1D36', primary: '#3F3351' },  // 星云紫
        { bg: '#2C061F', primary: '#374045' },  // 暗物质
    ];

    // 生成头像的主要函数
    function generateAvatar(style) {
        // 取消任何正在进行的动画
        cancelAnimationFrame(animationFrame);
        
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 设置背景
        ctx.fillStyle = bgColorInput.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 保存当前状态
        ctx.save();
        
        // 应用整体旋转
        const rotation = parseFloat(rotationInput.value);
        if (rotation !== 0) {
            // 移动到中心点进行旋转
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.translate(-canvas.width/2, -canvas.height/2);
        }

        // 根据风格生成头像
        switch(style) {
            case 'pixel':
                generatePixelAvatar();
                break;
            case 'geometric':
                generateGeometricAvatar();
                break;
        }

        // 恢复状态
        ctx.restore();

        // 如果启用动画，开始动画循环
        if (animateCheckbox && animateCheckbox.checked) {
            startAnimation();
        }
    }

    function startAnimation() {
        rotation += 0.02;
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(rotation);
        ctx.translate(-canvas.width/2, -canvas.height/2);
        generateAvatar(styleSelect.value);
        ctx.restore();
        animationFrame = requestAnimationFrame(startAnimation);
    }

    // 修改生成颜色变体的函数
    function generateColorVariants(baseColor, colorfulness) {
        const variants = [baseColor];
        const colorfulnessValue = parseFloat(colorfulness);
        
        // 将基础颜色转换为HSL
        let baseHSL = rgbToHsl(
            parseInt(baseColor.substr(1,2), 16),
            parseInt(baseColor.substr(3,2), 16),
            parseInt(baseColor.substr(5,2), 16)
        );
        
        // 基础的明暗变化
        const adjustmentStrength = 20 + (colorfulnessValue * 40);
        const variantCount = Math.floor(2 + (colorfulnessValue * 3));
        
        // 生成基础明暗变体
        for(let i = 1; i <= variantCount; i++) {
            variants.push(adjustColor(baseColor, adjustmentStrength * i / variantCount));
            variants.push(adjustColor(baseColor, -adjustmentStrength * i / variantCount));
        }
        
        // 根据色彩丰富度添加专业配色
        if(colorfulnessValue > 0.3) {
            // 单色配色方案
            variants.push(adjustSaturation(baseColor, 30));
            variants.push(adjustSaturation(baseColor, -20));
            variants.push(adjustLightness(baseColor, 20));
            variants.push(adjustLightness(baseColor, -20));
            
            if(colorfulnessValue > 0.5) {
                // 类比色配色方案（邻近色相）
                variants.push(adjustHue(baseColor, 30));
                variants.push(adjustHue(baseColor, -30));
                
                // 分裂互补色配色方案
                variants.push(adjustHue(baseColor, 150));
                variants.push(adjustHue(baseColor, -150));
                
                // 添加白色作为点缀
                variants.push('#FFFFFF');
            }
            
            if(colorfulnessValue > 0.7) {
                // 三角形配色方案
                variants.push(adjustHue(baseColor, 120));
                variants.push(adjustHue(baseColor, -120));
                
                // 方形配色方案
                variants.push(adjustHue(baseColor, 90));
                variants.push(adjustHue(baseColor, -90));
                variants.push(adjustHue(baseColor, 180));
                
                // 增加饱和度变化
                variants.push(adjustSaturation(adjustHue(baseColor, 120), 20));
                variants.push(adjustSaturation(adjustHue(baseColor, -120), 20));
            }
            
            if(colorfulnessValue > 0.9) {
                // 复杂的多色配色方案
                for(let i = 1; i <= 6; i++) {
                    const hue = (baseHSL[0] + i/6) % 1;
                    const sat = 0.7 + Math.random() * 0.3;
                    const light = 0.4 + Math.random() * 0.3;
                    variants.push(hslToHex(hue, sat, light));
                }
            }
        }
        
        return variants;
    }

    // 添加HSL转Hex的辅助函数
    function hslToHex(h, s, l) {
        const rgb = hslToRgb(h, s, l);
        return '#' + 
            Math.round(rgb[0]).toString(16).padStart(2, '0') +
            Math.round(rgb[1]).toString(16).padStart(2, '0') +
            Math.round(rgb[2]).toString(16).padStart(2, '0');
    }

    // 添加调整亮度的辅助函数
    function adjustLightness(color, amount) {
        let r = parseInt(color.substr(1,2), 16);
        let g = parseInt(color.substr(3,2), 16);
        let b = parseInt(color.substr(5,2), 16);
        
        let hsl = rgbToHsl(r, g, b);
        hsl[2] = Math.max(0, Math.min(1, hsl[2] + amount/100));
        
        let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
        
        return '#' + 
            Math.round(rgb[0]).toString(16).padStart(2, '0') +
            Math.round(rgb[1]).toString(16).padStart(2, '0') +
            Math.round(rgb[2]).toString(16).padStart(2, '0');
    }

    // 添加调整色相的辅助函数
    function adjustHue(color, amount) {
        let r = parseInt(color.substr(1,2), 16);
        let g = parseInt(color.substr(3,2), 16);
        let b = parseInt(color.substr(5,2), 16);
        
        let hsl = rgbToHsl(r, g, b);
        hsl[0] = (hsl[0] + amount/360) % 1; // 调整色相
        if(hsl[0] < 0) hsl[0] += 1;
        
        let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
        
        return '#' + 
            Math.round(rgb[0]).toString(16).padStart(2, '0') +
            Math.round(rgb[1]).toString(16).padStart(2, '0') +
            Math.round(rgb[2]).toString(16).padStart(2, '0');
    }

    // 添加调整饱和度的辅助函数
    function adjustSaturation(color, amount) {
        let r = parseInt(color.substr(1,2), 16);
        let g = parseInt(color.substr(3,2), 16);
        let b = parseInt(color.substr(5,2), 16);
        
        let hsl = rgbToHsl(r, g, b);
        hsl[1] = Math.max(0, Math.min(1, hsl[1] + amount/100));
        
        let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
        
        return '#' + 
            Math.round(rgb[0]).toString(16).padStart(2, '0') +
            Math.round(rgb[1]).toString(16).padStart(2, '0') +
            Math.round(rgb[2]).toString(16).padStart(2, '0');
    }

    // 修改像素风格头像生成函数
    function generatePixelAvatar() {
        const complexity = parseFloat(complexityInput.value);
        const colorfulness = parseFloat(colorfulnessInput.value);
        
        // 计算可用的像素尺寸（必须是画布尺寸的因数）
        const possibleSizes = [];
        for (let i = 10; i <= 100; i++) {
            if (canvas.width % i === 0 && canvas.height % i === 0) {
                possibleSizes.push(i);
            }
        }
        
        // 根据复杂度选择合适的像素大小
        const sizeIndex = Math.floor((1 - complexity) * (possibleSizes.length - 1));
        const pixelSize = possibleSizes[sizeIndex];
        
        // 使用新的颜色生成函数
        const colors = generateColorVariants(primaryColorInput.value, colorfulness);

        // 清除画布
        ctx.fillStyle = bgColorInput.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 根据复杂度调整像素密度
        const density = 0.3 + (complexity * 0.4);
        
        // 计算网格大小
        const gridWidth = canvas.width / pixelSize;
        const gridHeight = canvas.height / pixelSize;
        
        // 在画布上生成像素
        for(let x = 0; x < gridWidth; x++) {
            for(let y = 0; y < gridHeight; y++) {
                if(Math.random() < density) {
                    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                    ctx.fillRect(
                        x * pixelSize,
                        y * pixelSize,
                        pixelSize,
                        pixelSize
                    );
                }
            }
        }
    }

    // 辅助函数：调整颜色明度
    function adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        
        return '#' + 
            r.toString(16).padStart(2, '0') + 
            g.toString(16).padStart(2, '0') + 
            b.toString(16).padStart(2, '0');
    }

    // 添加RGB和HSL转换的辅助函数
    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
            } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l];
    }

    function hslToRgb(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [r * 255, g * 255, b * 255];
    }

    // 生成几何风格头像
    function generateGeometricAvatar() {
        const complexity = parseFloat(complexityInput.value);
        const colorfulness = parseFloat(colorfulnessInput.value);
        
        // 使用二次函数增加高复杂度时的形状数量：
        // 复杂度为0时约3个形状
        // 复杂度为0.5时约13个形状
        // 复杂度为1时约30个形状
        const shapes = Math.floor(3 + (complexity * 15) + (complexity * complexity * 12));
        
        // 生成一个随机的整体旋转角度
        const globalRotation = Math.floor(Math.random() * 360);
        // 更新旋转角度显示
        rotationValue.textContent = globalRotation.toString().padStart(3, ' ') + '°';
        rotationInput.value = globalRotation;
        
        // 使用新的颜色生成函数
        const colors = generateColorVariants(primaryColorInput.value, colorfulness);

        // 修改形状大小范围，大幅增加低复杂度时的形状大小
        const minSize = 60 + (complexity * 20);  // 最小尺寸范围：60-80
        const maxSize = 400 - (complexity * 320); // 最大尺寸范围：80-400
        
        // 根据复杂度动态调整网格大小，减少网格数以适应更大的形状
        const gridSize = Math.floor(3 + complexity * 3); // 复杂度0时3x3，复杂度1时6x6
        const cellWidth = canvas.width / gridSize;
        const cellHeight = canvas.height / gridSize;
        
        // 创建可用位置数组，包括网格点和网格中点
        let availablePositions = [];
        
        // 添加网格点
        for(let i = 0; i < gridSize; i++) {
            for(let j = 0; j < gridSize; j++) {
                availablePositions.push({
                    x: (j + 0.5) * cellWidth,
                    y: (i + 0.5) * cellHeight,
                    used: false
                });
            }
        }
        
        // 根据复杂度决定是否添加网格中点
        if (complexity > 0.5) {
            for(let i = 0; i < gridSize - 1; i++) {
                for(let j = 0; j < gridSize - 1; j++) {
                    availablePositions.push({
                        x: (j + 1) * cellWidth,
                        y: (i + 1) * cellHeight,
                        used: false
                    });
                }
            }
        }
        
        // 生成所有形状
        for(let i = 0; i < shapes; i++) {
            const size = minSize + Math.random() * (maxSize - minSize);
            
            // 根据复杂度调整最小距离要求
            const minDistanceMultiplier = 1 - (complexity * 0.6); // 复杂度越高，最小距离要求越小
            
            // 找到最近的未使用位置
            let bestPosition = null;
            let maxMinDistance = -1;
            
            // 从未使用的位置中找到合适的点
            const unusedPositions = availablePositions.filter(pos => !pos.used);
            for(const pos of unusedPositions) {
                let minDistance = Number.MAX_VALUE;
                
                // 计算到所有已使用位置的最小距离
                for(const usedPos of availablePositions.filter(p => p.used)) {
                    const distance = Math.sqrt(
                        Math.pow(pos.x - usedPos.x, 2) + 
                        Math.pow(pos.y - usedPos.y, 2)
                    );
                    minDistance = Math.min(minDistance, distance);
                }
                
                // 根据复杂度调整距离判断
                const adjustedDistance = minDistance * minDistanceMultiplier;
                if (maxMinDistance < adjustedDistance) {
                    maxMinDistance = adjustedDistance;
                    bestPosition = pos;
                }
            }
            
            // 如果没有找到合适的位置，随机选择一个未使用的位置
            if (!bestPosition && unusedPositions.length > 0) {
                bestPosition = unusedPositions[Math.floor(Math.random() * unusedPositions.length)];
            } else if (!bestPosition) {
                // 如果所有位置都被使用，随机选择一个位置
                bestPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
            }
            
            // 标记位置为已使用
            bestPosition.used = true;
            
            // 添加随机偏移，复杂度越高偏移越小
            const maxOffset = Math.min(cellWidth, cellHeight) * 0.2 * (1 - complexity * 0.5);
            const x = bestPosition.x + (Math.random() - 0.5) * maxOffset;
            const y = bestPosition.y + (Math.random() - 0.5) * maxOffset;
            
            // 确保形状不会完全超出画布
            const safeX = Math.max(size/2, Math.min(canvas.width - size/2, x));
            const safeY = Math.max(size/2, Math.min(canvas.height - size/2, y));
            
            generateShape(safeX, safeY, size, colors, complexity);
        }
    }

    // 辅助函数：生成单个形状
    function generateShape(x, y, size, colors, complexity) {
        const shapeType = Math.floor(Math.random() * 4);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.fillStyle = color;
        ctx.strokeStyle = adjustColor(color, -20);
        ctx.lineWidth = 2 + (1 - complexity);
        
        // 只在高复杂度时允许少量重叠
        if(complexity > 0.7 && Math.random() < 0.3) {
            ctx.globalAlpha = 0.9;
        } else {
        ctx.beginPath();
            ctx.globalAlpha = 1;
        }
        
        // 保存当前状态
        ctx.save();
        
        // 对形状进行随机旋转
        ctx.translate(x, y);
        const rotation = Math.random() * Math.PI * 2; // 随机旋转 0-360 度
        ctx.rotate(rotation);
        ctx.translate(-x, -y);
        
        switch(shapeType) {
            case 0: // 圆形
                ctx.beginPath();
                ctx.arc(x, y, size/2, 0, Math.PI * 2);
                break;
            case 1: // 三角形
                drawPolygon(x, y, size/2, 3, rotation); // 传入旋转角度
                break;
            case 2: // 矩形
                ctx.beginPath();
                ctx.rect(x - size/2, y - size/2, size, size);
                break;
            case 3: // 多边形
                drawPolygon(x, y, size/2, 5 + Math.floor(complexity * 3), rotation); // 传入旋转角度
                break;
        }
        
        if(Math.random() > 0.5) {
        ctx.fill();
        } else {
            ctx.stroke();
        }
        
        // 恢复状态
        ctx.restore();
    }

    // 事件监听器
    generateBtn.addEventListener('click', () => {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 如果是几何风格，随机设置旋转角度
        if (styleSelect.value === 'geometric') {
            const newRotation = Math.floor(Math.random() * 360);
            rotationInput.value = newRotation;
            rotationValue.textContent = newRotation.toString().padStart(3, ' ') + '°';
        }
        
        // 生成新头像
        generateAvatar(styleSelect.value);
    });

    randomizeBtn.addEventListener('click', () => {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 从预设配色方案中随机选择一个
        const scheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        
        // 应用选中的配色方案
        bgColorInput.value = scheme.bg;
        primaryColorInput.value = scheme.primary;
        
        // 随机复杂度 (0-1，保留两位小数)
        const newComplexity = (Math.random()).toFixed(2);
        complexityInput.value = newComplexity;
        complexityValue.textContent = newComplexity;
        
        // 只在非几何风格时设置随机旋转角度的显示
        if (styleSelect.value !== 'geometric') {
            const newRotation = Math.floor(Math.random() * 360);
            rotationInput.value = newRotation;
            rotationValue.textContent = newRotation.toString().padStart(3, ' ') + '°';
        }
        
        // 使用当前选中的风格生成新的头像
        generateAvatar(styleSelect.value);
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'facelab-avatar.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // 添加随机颜色按钮的事件监听器
    const randomColorBtn = document.getElementById('random-color-btn');

    randomColorBtn.addEventListener('click', () => {
        // 从预设配色方案中随机选择一个
        const scheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        
        // 应用选中的配色方案
        bgColorInput.value = scheme.bg;
        primaryColorInput.value = scheme.primary;
        
        // 使用当前的其他参数重新生成头像
        generateAvatar(styleSelect.value);
    });

    // 辅助函数
    function drawPolygon(x, y, radius, sides, rotation = 0) {
        ctx.beginPath();
        for(let i = 0; i < sides; i++) {
            const angle = rotation + (i * 2 * Math.PI / sides) - Math.PI / 2;
            const px = x + radius * Math.cos(angle);
            const py = y + radius * Math.sin(angle);
            if(i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
    }

    // 修改风格切换事件监听器
    styleSelect.addEventListener('change', function() {
        const rotationControl = document.querySelector('.rotation-control');
        
        if (this.value === 'geometric') {
            // 完全隐藏旋转角度控制
            rotationControl.style.display = 'none';
            
            // 自动设置一个随机旋转角度（但不显示）
            rotationInput.value = Math.floor(Math.random() * 360);
        } else {
            // 恢复正常显示
            rotationControl.style.display = 'block';
        }
    });

    // 修改页面加载时的初始化
    document.addEventListener('DOMContentLoaded', () => {
        const rotationControl = document.querySelector('.rotation-control');
        
        if (styleSelect.value === 'geometric') {
            // 完全隐藏旋转角度控制
            rotationControl.style.display = 'none';
            
            // 自动设置一个随机旋转角度（但不显示）
            rotationInput.value = Math.floor(Math.random() * 360);
        }
    });
}); 