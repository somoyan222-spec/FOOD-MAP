import React from "react";

export const MemphisPattern: React.FC = () => {
  const shapes = [
    { type: "circle", color: "#FF6B6B", size: 60, top: "10%", left: "5%", delay: "0s" },
    { type: "circle", color: "#98D9C2", size: 40, top: "60%", left: "8%", delay: "1s" },
    { type: "circle", color: "#C3B1E1", size: 80, top: "80%", left: "15%", delay: "2s" },
    { type: "circle", color: "#F7DC6F", size: 50, top: "25%", right: "10%", delay: "0.5s" },
    { type: "semicircle", color: "#FF6B6B", size: 70, top: "5%", left: "30%", delay: "0.8s" },
    { type: "semicircle", color: "#98D9C2", size: 50, top: "50%", right: "25%", delay: "1.8s" },
    { type: "semicircle", color: "#F7DC6F", size: 60, bottom: "10%", left: "40%", delay: "2.5s" },
    { type: "dots", color: "#F7DC6F", size: 100, top: "35%", left: "50%", delay: "0s" },
    { type: "triangle", color: "#FFB6C1", size: 40, top: "20%", right: "35%", delay: "0.6s" },
    { type: "triangle", color: "#FFA07A", size: 30, bottom: "15%", right: "20%", delay: "1.6s" },
  ];

  return (
    <div className="memphis-pattern-bg">
      {shapes.map((shape, index) => {
        const style: React.CSSProperties = {
          position: "absolute",
          top: shape.top,
          left: shape.left,
          right: shape.right,
          bottom: shape.bottom,
          animationDelay: shape.delay,
        };

        if (shape.type === "circle") {
          return (
            <div
              key={index}
              className="memphis-shape memphis-circle animate-float"
              style={{
                ...style,
                width: shape.size,
                height: shape.size,
                background: shape.color,
              }}
            />
          );
        }

        if (shape.type === "semicircle") {
          return (
            <div
              key={index}
              className="memphis-shape memphis-semicircle animate-bounce-slow"
              style={{
                ...style,
                width: shape.size,
                height: shape.size! / 2,
                background: shape.color,
              }}
            />
          );
        }

        if (shape.type === "wave") {
          return (
            <div
              key={index}
              className="memphis-shape animate-wiggle"
              style={{
                ...style,
                width: shape.width,
                height: 8,
                background: `repeating-linear-gradient(90deg, ${shape.color} 0px, ${shape.color} 15px, transparent 15px, transparent 30px)`,
                borderRadius: 4,
              }}
            />
          );
        }

        if (shape.type === "dots") {
          return (
            <div
              key={index}
              className="animate-pulse-memphis"
              style={{
                ...style,
                width: shape.size,
                height: shape.size,
                background: `radial-gradient(${shape.color} 4px, transparent 4px)`,
                backgroundSize: "15px 15px",
              }}
            />
          );
        }

        if (shape.type === "triangle") {
          return (
            <div
              key={index}
              className="animate-float"
              style={{
                ...style,
                width: 0,
                height: 0,
                border: "none",
                borderLeft: `${shape.size}px solid transparent`,
                borderRight: `${shape.size}px solid transparent`,
                borderBottom: `${shape.size! * 1.7}px solid ${shape.color}`,
                filter: `drop-shadow(2px 2px 0px #2C2C2C)`,
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export const MemphisStatCard: React.FC<{
  value: string | number;
  label: string;
  color?: string;
  rotation?: number;
  icon?: React.ReactNode;
}> = ({ value, label, color = "#98D9C2", rotation = 0, icon }) => {
  return (
    <div
      className="memphis-card"
      style={{
        background: color,
        transform: `rotate(${rotation}deg)`,
        padding: "24px 32px",
        minWidth: "140px",
        textAlign: "center",
      }}
    >
      {icon && <div className="mb-2">{icon}</div>}
      <div className="text-4xl font-extrabold" style={{ fontFamily: "var(--font-memphis)" }}>
        {value}
      </div>
      <div className="text-sm font-bold uppercase tracking-wider mt-1 opacity-80">
        {label}
      </div>
    </div>
  );
};

export const MemphisIconButton: React.FC<{
  icon: React.ReactNode;
  onClick?: () => void;
  color?: string;
  rotation?: number;
  title?: string;
}> = ({ icon, onClick, color = "#FF6B6B", rotation = 0, title }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className="memphis-button"
      style={{
        background: color,
        padding: "10px",
        minWidth: "44px",
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {icon}
    </button>
  );
};
