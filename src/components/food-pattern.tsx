import React from "react";

export const FoodPattern: React.FC = () => {
  const foodShapes = [
    // 咖啡杯
    { type: "coffee", color: "#C3B1E1", size: 50, top: "8%", left: "5%", delay: "0s", rotation: 15 },
    { type: "coffee", color: "#FFB6C1", size: 40, top: "70%", left: "8%", delay: "1.5s", rotation: -10 },
    // 汉堡
    { type: "burger", color: "#F7DC6F", size: 55, top: "15%", right: "12%", delay: "0.8s", rotation: -5 },
    { type: "burger", color: "#FF6B6B", size: 45, bottom: "20%", right: "8%", delay: "2s", rotation: 8 },
    // 奶茶杯
    { type: "bubbletea", color: "#98D9C2", size: 48, top: "40%", left: "3%", delay: "1s", rotation: 12 },
    { type: "bubbletea", color: "#FFA07A", size: 42, top: "85%", right: "15%", delay: "0.3s", rotation: -8 },
    // 披萨
    { type: "pizza", color: "#FF6B6B", size: 50, top: "5%", left: "35%", delay: "1.2s", rotation: 20 },
    { type: "pizza", color: "#F7DC6F", size: 38, bottom: "10%", left: "25%", delay: "0.6s", rotation: -15 },
    // 冰淇淋
    { type: "icecream", color: "#FFB6C1", size: 45, top: "60%", right: "5%", delay: "1.8s", rotation: 5 },
    { type: "icecream", color: "#C3B1E1", size: 40, top: "25%", right: "30%", delay: "0.9s", rotation: -12 },
    // 甜甜圈
    { type: "donut", color: "#98D9C2", size: 48, top: "50%", left: "12%", delay: "2.2s", rotation: 18 },
    { type: "donut", color: "#FFA07A", size: 42, bottom: "35%", left: "40%", delay: "0.4s", rotation: -6 },
    // 寿司
    { type: "sushi", color: "#F7DC6F", size: 40, top: "75%", left: "20%", delay: "1.6s", rotation: 10 },
    { type: "sushi", color: "#FF6B6B", size: 35, top: "35%", right: "20%", delay: "0.7s", rotation: -18 },
    // 面条
    { type: "noodles", color: "#C3B1E1", size: 45, bottom: "25%", right: "25%", delay: "1.4s", rotation: 7 },
    { type: "noodles", color: "#98D9C2", size: 38, top: "12%", right: "5%", delay: "0.2s", rotation: -14 },
  ];

  const renderFoodShape = (shape: typeof foodShapes[0], index: number) => {
    const style: React.CSSProperties = {
      position: "absolute",
      top: shape.top,
      left: shape.left,
      right: shape.right,
      bottom: shape.bottom,
      animationDelay: shape.delay,
      transform: `rotate(${shape.rotation}deg)`,
    };

    const commonClasses = "animate-float food-shape";

    switch (shape.type) {
      case "coffee":
        return (
          <div
            key={index}
            className={commonClasses}
            style={{
              ...style,
              width: shape.size,
              height: shape.size * 1.2,
            }}
          >
            {/* 咖啡杯身 */}
            <div
              style={{
                width: "100%",
                height: "75%",
                background: shape.color,
                border: "3px solid #2C2C2C",
                borderRadius: "8px 8px 20px 20px",
                position: "relative",
              }}
            >
              {/* 咖啡液体 */}
              <div
                style={{
                  position: "absolute",
                  top: "15%",
                  left: "10%",
                  right: "10%",
                  height: "60%",
                  background: "#8B4513",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* 杯把 */}
            <div
              style={{
                position: "absolute",
                top: "20%",
                right: "-25%",
                width: "30%",
                height: "40%",
                border: "3px solid #2C2C2C",
                borderLeft: "none",
                borderRadius: "0 50% 50% 0",
              }}
            />
            {/* 蒸汽 */}
            <div
              className="animate-pulse-memphis"
              style={{
                position: "absolute",
                top: "-20%",
                left: "20%",
                width: "8px",
                height: "15px",
                background: "#2C2C2C",
                borderRadius: "50%",
                opacity: 0.3,
              }}
            />
            <div
              className="animate-pulse-memphis"
              style={{
                position: "absolute",
                top: "-25%",
                right: "30%",
                width: "6px",
                height: "12px",
                background: "#2C2C2C",
                borderRadius: "50%",
                opacity: 0.3,
                animationDelay: "0.3s",
              }}
            />
          </div>
        );

      case "burger":
        return (
          <div
            key={index}
            className={commonClasses}
            style={{
              ...style,
              width: shape.size,
              height: shape.size * 0.9,
            }}
          >
            {/* 汉堡顶层面包 */}
            <div
              style={{
                width: "100%",
                height: "35%",
                background: "#D2691E",
                border: "3px solid #2C2C2C",
                borderRadius: "50% 50% 10% 10%",
                position: "relative",
                zIndex: 4,
              }}
            >
              {/* 芝麻 */}
              <div style={{ position: "absolute", top: "30%", left: "25%", width: "4px", height: "4px", background: "#FFF", borderRadius: "50%" }} />
              <div style={{ position: "absolute", top: "40%", right: "30%", width: "4px", height: "4px", background: "#FFF", borderRadius: "50%" }} />
              <div style={{ position: "absolute", top: "25%", left: "50%", width: "4px", height: "4px", background: "#FFF", borderRadius: "50%" }} />
            </div>
            {/* 生菜 */}
            <div
              style={{
                width: "110%",
                height: "12%",
                background: "#98D9C2",
                border: "3px solid #2C2C2C",
                borderRadius: "10px",
                marginLeft: "-5%",
                marginTop: "-5%",
                position: "relative",
                zIndex: 3,
              }}
            />
            {/* 番茄 */}
            <div
              style={{
                width: "95%",
                height: "10%",
                background: "#FF6B6B",
                border: "3px solid #2C2C2C",
                borderRadius: "5px",
                margin: "0 auto",
                marginTop: "-3%",
                position: "relative",
                zIndex: 2,
              }}
            />
            {/* 肉饼 */}
            <div
              style={{
                width: "100%",
                height: "20%",
                background: "#8B4513",
                border: "3px solid #2C2C2C",
                borderRadius: "8px",
                marginTop: "-3%",
                position: "relative",
                zIndex: 1,
              }}
            />
            {/* 底层面包 */}
            <div
              style={{
                width: "100%",
                height: "25%",
                background: "#D2691E",
                border: "3px solid #2C2C2C",
                borderRadius: "10% 10% 30% 30%",
                marginTop: "-5%",
              }}
            />
          </div>
        );

      case "bubbletea":
        return (
          <div
            key={index}
            className={commonClasses}
            style={{
              ...style,
              width: shape.size,
              height: shape.size * 1.3,
            }}
          >
            {/* 奶茶杯身 */}
            <div
              style={{
                width: "85%",
                height: "70%",
                background: shape.color,
                border: "3px solid #2C2C2C",
                borderRadius: "5px 5px 15px 15px",
                margin: "0 auto",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* 奶茶液体 */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: "5%",
                  right: "5%",
                  height: "75%",
                  background: "#D2B48C",
                  borderRadius: "0 0 10px 10px",
                }}
              />
              {/* 珍珠 */}
              <div style={{ position: "absolute", bottom: "15%", left: "20%", width: "8px", height: "8px", background: "#2C2C2C", borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: "20%", right: "25%", width: "8px", height: "8px", background: "#2C2C2C", borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: "12%", left: "50%", width: "8px", height: "8px", background: "#2C2C2C", borderRadius: "50%" }} />
            </div>
            {/* 杯盖 */}
            <div
              style={{
                width: "100%",
                height: "12%",
                background: "#2C2C2C",
                borderRadius: "5px",
                marginBottom: "-5%",
              }}
            />
            {/* 吸管 */}
            <div
              style={{
                position: "absolute",
                top: "-15%",
                right: "25%",
                width: "8px",
                height: "35%",
                background: "#FF6B6B",
                border: "2px solid #2C2C2C",
                borderRadius: "4px",
                transform: "rotate(10deg)",
              }}
            />
          </div>
        );

      case "pizza":
        return (
          <div
            key={index}
            className={`${commonClasses} animate-bounce-slow`}
            style={{
              ...style,
              width: shape.size,
              height: shape.size,
            }}
          >
            {/* 披萨切片 */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              {/* 披萨底 */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#F4A460",
                  border: "3px solid #2C2C2C",
                  borderRadius: "50%",
                  clipPath: "polygon(50% 50%, 0 0, 100% 0)",
                }}
              />
              {/* 芝士 */}
              <div
                style={{
                  position: "absolute",
                  top: "15%",
                  left: "25%",
                  width: "50%",
                  height: "35%",
                  background: "#FFD700",
                  clipPath: "polygon(50% 100%, 0 0, 100% 0)",
                }}
              />
              {/* 意大利香肠 */}
              <div style={{ position: "absolute", top: "25%", left: "40%", width: "12px", height: "12px", background: "#DC143C", borderRadius: "50%", border: "2px solid #2C2C2C" }} />
              <div style={{ position: "absolute", top: "35%", left: "55%", width: "10px", height: "10px", background: "#DC143C", borderRadius: "50%", border: "2px solid #2C2C2C" }} />
            </div>
          </div>
        );

      case "icecream":
        return (
          <div
            key={index}
            className={commonClasses}
            style={{
              ...style,
              width: shape.size,
              height: shape.size * 1.4,
            }}
          >
            {/* 冰淇淋球 - 顶层 */}
            <div
              style={{
                width: "70%",
                height: "35%",
                background: "#FFB6C1",
                border: "3px solid #2C2C2C",
                borderRadius: "50% 50% 40% 40%",
                margin: "0 auto",
                position: "relative",
                zIndex: 3,
              }}
            />
            {/* 冰淇淋球 - 中层 */}
            <div
              style={{
                width: "80%",
                height: "30%",
                background: "#F7DC6F",
                border: "3px solid #2C2C2C",
                borderRadius: "50%",
                margin: "0 auto",
                marginTop: "-15%",
                position: "relative",
                zIndex: 2,
              }}
            />
            {/* 冰淇淋球 - 底层 */}
            <div
              style={{
                width: "85%",
                height: "28%",
                background: "#98D9C2",
                border: "3px solid #2C2C2C",
                borderRadius: "50%",
                margin: "0 auto",
                marginTop: "-12%",
                position: "relative",
                zIndex: 1,
              }}
            />
            {/* 蛋筒 */}
            <div
              style={{
                width: "0",
                height: "0",
                borderLeft: "20px solid transparent",
                borderRight: "20px solid transparent",
                borderTop: "50px solid #D2691E",
                margin: "0 auto",
                marginTop: "-5%",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  left: "-20px",
                  width: "40px",
                  height: "50px",
                  background: "transparent",
                  borderLeft: "3px solid #2C2C2C",
                  borderRight: "3px solid #2C2C2C",
                  borderBottom: "3px solid #2C2C2C",
                }}
              />
            </div>
          </div>
        );

      case "donut":
        return (
          <div
            key={index}
            className={`${commonClasses} animate-wiggle`}
            style={{
              ...style,
              width: shape.size,
              height: shape.size,
            }}
          >
            {/* 甜甜圈外圈 */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: shape.color,
                border: "3px solid #2C2C2C",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              {/* 甜甜圈中间洞 */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "35%",
                  height: "35%",
                  background: "#FFF8E7",
                  border: "3px solid #2C2C2C",
                  borderRadius: "50%",
                }}
              />
              {/* 糖霜装饰 */}
              <div style={{ position: "absolute", top: "20%", left: "25%", width: "8px", height: "8px", background: "#FFF", borderRadius: "50%" }} />
              <div style={{ position: "absolute", top: "30%", right: "20%", width: "6px", height: "6px", background: "#FFF", borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: "25%", left: "30%", width: "7px", height: "7px", background: "#FFF", borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: "30%", right: "25%", width: "5px", height: "5px", background: "#FFF", borderRadius: "50%" }} />
            </div>
          </div>
        );

      case "sushi":
        return (
          <div
            key={index}
            className={commonClasses}
            style={{
              ...style,
              width: shape.size,
              height: shape.size * 0.7,
            }}
          >
            {/* 寿司米饭 */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#FFF",
                border: "3px solid #2C2C2C",
                borderRadius: "8px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* 寿司配料 */}
              <div
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "5%",
                  right: "5%",
                  height: "50%",
                  background: shape.color,
                  borderRadius: "5px",
                }}
              />
              {/* 海苔 */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "30%",
                  background: "#2C2C2C",
                }}
              />
            </div>
          </div>
        );

      case "noodles":
        return (
          <div
            key={index}
            className={commonClasses}
            style={{
              ...style,
              width: shape.size,
              height: shape.size * 0.8,
            }}
          >
            {/* 面条碗 */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              {/* 碗身 */}
              <div
                style={{
                  width: "90%",
                  height: "70%",
                  background: shape.color,
                  border: "3px solid #2C2C2C",
                  borderRadius: "0 0 40% 40%",
                  margin: "0 auto",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* 汤 */}
                <div
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: "5%",
                    right: "5%",
                    height: "60%",
                    background: "#D2691E",
                    borderRadius: "0 0 35% 35%",
                  }}
                />
                {/* 面条线条 */}
                <div style={{ position: "absolute", top: "30%", left: "20%", width: "60%", height: "3px", background: "#F7DC6F", borderRadius: "2px" }} />
                <div style={{ position: "absolute", top: "40%", left: "25%", width: "50%", height: "3px", background: "#F7DC6F", borderRadius: "2px" }} />
                <div style={{ position: "absolute", top: "50%", left: "15%", width: "55%", height: "3px", background: "#F7DC6F", borderRadius: "2px" }} />
              </div>
              {/* 筷子 */}
              <div
                style={{
                  position: "absolute",
                  top: "-10%",
                  right: "10%",
                  width: "6px",
                  height: "50%",
                  background: "#8B4513",
                  border: "2px solid #2C2C2C",
                  borderRadius: "3px",
                  transform: "rotate(25deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-8%",
                  right: "5%",
                  width: "6px",
                  height: "45%",
                  background: "#8B4513",
                  border: "2px solid #2C2C2C",
                  borderRadius: "3px",
                  transform: "rotate(30deg)",
                }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="food-pattern-bg">
      {foodShapes.map((shape, index) => renderFoodShape(shape, index))}
    </div>
  );
};
