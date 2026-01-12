import { useGlobalState } from "../store/globalState";

export function LoadingOverlay() {
  const isLoading = useGlobalState((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        borderRadius: "inherit", // Inherit border radius from parent (attachment card)
      }}
    >
      <div
        className="vc-spinner"
        style={{
          width: "30px",
          height: "30px",
          border: "3px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
          borderTopColor: "#fff",
          animation: "spin 1s ease-in-out infinite",
        }}
      ></div>
      <style>
        {`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                `}
      </style>
    </div>
  );
}
