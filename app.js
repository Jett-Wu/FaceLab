document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('avatarCanvas');
    const ctx = canvas.getContext('2d');
    const generateBtn = document.getElementById('generate-btn');
    const randomizeBtn = document.getElementById('randomize-btn');
    const downloadBtn = document.getElementById('download-btn');
    const randomColorBtn = document.getElementById('random-color-btn');
    const styleSelect = document.getElementById('styleSelect');
    const bgColorInput = document.getElementById('bgColor');
    const primaryColorInput = document.getElementById('primaryColor');
    const complexityInput = document.getElementById('complexity');
    const rotationInput = document.getElementById('rotation');
    const colorfulnessInput = document.getElementById('colorfulness');
    
    let animationFrame;
    let rotation = 0;

    // 设置画布大小
    canvas.width = 800;
    canvas.height = 800;

    // 设置画布的显示大小（通过CSS）
    canvas.style.width = '400px';   // 保持显示大小不变
    canvas.style.height = '400px';  // 保持显示大小不变

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

    // 修改生成头像的函数
    function generateAvatar(style) {
        // 清除任何现有的动画
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        // 隐藏预览占位符
        const placeholder = document.querySelector('.preview-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }

        // 根据风格生成头像
        if (style === 'pixel') {
            generatePixelAvatar();
        } else if (style === 'geometric') {
            generateGeometricAvatar();
        }
    }

    // 修改生成几何风格头像的函数
    function generateGeometricAvatar() {
        const complexity = parseFloat(complexityInput.value);
        const colorfulness = parseFloat(colorfulnessInput.value);
        
        // 使用二次函数增加高复杂度时的形状数量
        const shapes = Math.floor(3 + (complexity * 15) + (complexity * complexity * 12));
        
        // 使用新的颜色生成函数
        const colors = generateColorVariants(primaryColorInput.value, colorfulness);

        // 清除画布并设置背景
        ctx.fillStyle = bgColorInput.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 保存初始状态
        ctx.save();
        
        // 应用整体旋转（在中心点）
        const rotation = parseFloat(rotationInput.value);
        if (rotation !== 0) {
            // 先清除整个画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 在旋转前填充背景
            ctx.fillStyle = bgColorInput.value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 移动到中心点进行旋转
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.translate(-canvas.width/2, -canvas.height/2);
            
            // 创建一个比画布稍大的背景矩形，确保旋转后没有空隙
            const diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
            const offset = (diagonal - canvas.width) / 2;
            ctx.fillStyle = bgColorInput.value;
            ctx.fillRect(-offset, -offset, diagonal, diagonal);
        }

        // 修改形状大小范围
        const minSize = 60 + (complexity * 20);  // 最小尺寸范围：60-80
        const maxSize = 450 - (complexity * 320); // 最大尺寸范围：130-450 (减少了50)
        
        // 修改网格大小和随机分布逻辑
        const gridSize = Math.floor(4 + complexity * 4); // 增加基础网格密度
        const cellWidth = canvas.width / gridSize;
        const cellHeight = canvas.height / gridSize;
        
        // 创建更随机的可用位置数组
        let availablePositions = [];
        
        // 添加带有随机偏移的网格点
        for(let i = 0; i < gridSize; i++) {
            for(let j = 0; j < gridSize; j++) {
                // 增加随机偏移量
                const offsetX = (Math.random() - 0.5) * cellWidth * 0.8;
                const offsetY = (Math.random() - 0.5) * cellHeight * 0.8;
                
                availablePositions.push({
                    x: (j + 0.5) * cellWidth + offsetX,
                    y: (i + 0.5) * cellHeight + offsetY,
                    used: false
                });
            }
        }
        
        // 添加完全随机的点
        const randomPoints = Math.floor(gridSize * gridSize * 0.5); // 添加50%的随机点
        for(let i = 0; i < randomPoints; i++) {
            availablePositions.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                used: false
            });
        }
        
        // 修改形状生成的逻辑
        for(let i = 0; i < shapes; i++) {
            const size = minSize + Math.random() * (maxSize - minSize);
            
            // 尝试找到一个较好的位置（减少重叠）
            let bestPosition = null;
            let bestOverlap = Infinity;
            const attempts = 10; // 尝试次数
            
            for(let attempt = 0; attempt < attempts; attempt++) {
                // 随机选择一个未使用的位置
                let availableIndices = availablePositions
                    .map((pos, index) => ({ pos, index }))
                    .filter(item => !item.pos.used);
                    
                if (availableIndices.length === 0) {
                    availableIndices = availablePositions
                        .map((pos, index) => ({ pos, index }));
                }
                
                const randomIndex = Math.floor(Math.random() * availableIndices.length);
                const testPosition = availableIndices[randomIndex].pos;
                
                // 计算与已使用位置的重叠程度
                let totalOverlap = 0;
                for(const usedPos of availablePositions.filter(p => p.used)) {
                    const dx = testPosition.x - usedPos.x;
                    const dy = testPosition.y - usedPos.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minSafeDistance = size * 0.8; // 期望的最小安全距离
                    
                    if (distance < minSafeDistance) {
                        totalOverlap += (minSafeDistance - distance);
                    }
                }
                
                // 如果找到更好的位置，更新最佳位置
                if (totalOverlap < bestOverlap) {
                    bestOverlap = totalOverlap;
                    bestPosition = testPosition;
                }
                
                // 如果找到一个几乎没有重叠的位置，立即使用它
                if (totalOverlap < size * 0.1) {
                    break;
                }
            }
            
            // 使用找到的最佳位置
            bestPosition.used = true;
            
            // 添加随机偏移，但根据重叠程度调整偏移范围
            const maxOffset = Math.min(cellWidth, cellHeight) * 0.3 * (1 - bestOverlap / (size * 2));
            const x = bestPosition.x + (Math.random() - 0.5) * maxOffset;
            const y = bestPosition.y + (Math.random() - 0.5) * maxOffset;
            
            // 确保形状在画布内
            const safeX = Math.max(size/2, Math.min(canvas.width - size/2, x));
            const safeY = Math.max(size/2, Math.min(canvas.height - size/2, y));
            
            // 生成形状
            const shapeType = Math.floor(Math.random() * 4);
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            ctx.fillStyle = color;
            ctx.strokeStyle = adjustColor(color, -30);
            ctx.lineWidth = 3;
            
            // 随机选择是否使用填充或描边
            const useFill = Math.random() > 0.3;
            
            // 保存当前状态
            ctx.save();
            
            // 对形状进行随机旋转
            ctx.translate(safeX, safeY);
            const rotation = Math.random() * Math.PI * 2;
            ctx.rotate(rotation);
            ctx.translate(-safeX, -safeY);
            
            switch(shapeType) {
                case 0: // 圆形
                    ctx.beginPath();
                    ctx.arc(safeX, safeY, size/2, 0, Math.PI * 2);
                    break;
                case 1: // 三角形
                    drawPolygon(safeX, safeY, size/2, 3, rotation);
                    break;
                case 2: // 矩形
                    ctx.beginPath();
                    ctx.rect(safeX - size/2, safeY - size/2, size, size);
                break;
                case 3: // 多边形
                    drawPolygon(safeX, safeY, size/2, 5 + Math.floor(Math.random() * 3), rotation);
                break;
        }
            
            if(useFill) {
                ctx.fill();
            } else {
                ctx.stroke();
            }

        // 恢复状态
            ctx.restore();
        }

        // 在生成完所有形状后恢复状态
        ctx.restore();
    }

    // 修改生成像素风格头像的函数
    function generatePixelAvatar() {
        const complexity = parseFloat(complexityInput.value);
        const colorfulness = parseFloat(colorfulnessInput.value);
        
        // 计算目标像素大小
        const targetSize = 200 - (complexity * 180);
        
        // 找到最接近目标大小的因数
        function findClosestFactor(target) {
            // 获取所有可能的因数
            const factors = [];
            for (let i = 20; i <= 200; i++) {
                if (canvas.width % i === 0 && canvas.height % i === 0) {
                    factors.push(i);
                }
            }
            
            // 如果没有找到因数，返回默认值
            if (factors.length === 0) return 40;
            
            // 找到最接近目标值的因数
            return factors.reduce((prev, curr) => {
                return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
            });
        }
        
        // 获取实际使用的像素大小
        const pixelSize = findClosestFactor(targetSize);
        
        // 计算网格大小
        const gridSize = Math.floor(canvas.width / pixelSize);
        
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

    // 修改颜色调整函数，使其产生更明显的颜色差异
    function adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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

    // 添加绘制多边形的辅助函数
    function drawPolygon(x, y, radius, sides, rotation = 0) {
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI / sides) + rotation;
            const pointX = x + radius * Math.cos(angle);
            const pointY = y + radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(pointX, pointY);
            } else {
                ctx.lineTo(pointX, pointY);
            }
        }
        ctx.closePath();
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

    // 事件监听器
    generateBtn.addEventListener('click', () => {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 如果是几何风格，随机设置旋转角度
        if (styleSelect.value === 'geometric') {
            rotationInput.value = Math.floor(Math.random() * 360);
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
        
        // 随机复杂度
        complexityInput.value = Math.random().toFixed(2);
        
        // 随机旋转角度（仅在非几何风格时）
        if (styleSelect.value !== 'geometric') {
            rotationInput.value = Math.floor(Math.random() * 360);
        }
        
        // 随机色彩丰富度
        colorfulnessInput.value = Math.random().toFixed(2);
        
        // 生成新头像
        generateAvatar(styleSelect.value);
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'facelab-avatar.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // 随机颜色按钮事件
    randomColorBtn.addEventListener('click', () => {
        // 从预设配色方案中随机选择一个
        const scheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        
        // 应用选中的配色方案
        bgColorInput.value = scheme.bg;
        primaryColorInput.value = scheme.primary;
        
        // 使用当前的其他参数重新生成头像
        generateAvatar(styleSelect.value);
    });

    // 风格切换事件
    styleSelect.addEventListener('change', function() {
        const rotationControl = document.querySelector('.rotation-control');
        
        // 始终隐藏旋转控制，但在几何风格下保持功能
        rotationControl.style.display = 'none';
        
        if (this.value === 'geometric') {
            // 在几何风格下设置随机旋转值，但不显示控制器
            rotationInput.value = Math.floor(Math.random() * 360);
        } else {
            // 在其他风格下禁用旋转
            rotationInput.value = 0;
        }
        
        // 重新生成头像
        generateAvatar(this.value);
    });

    // 初始化页面时的处理
    document.addEventListener('DOMContentLoaded', () => {
        const placeholder = document.querySelector('.preview-placeholder');
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
        
        const rotationControl = document.querySelector('.rotation-control');
        if (styleSelect.value === 'geometric') {
            rotationControl.style.display = 'none';
            rotationInput.value = Math.floor(Math.random() * 360);
        }
    });
}); 