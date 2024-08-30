import { Toast as BootstrapToast } from "bootstrap";
import { useState, useEffect, useRef } from "react";

type ToastProps = {
    actionType: "added" | "completed" | "deleted" | null;
};

function Toast(props: ToastProps) {
    const [message, setMessage] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.actionType) {
            switch (props.actionType) {
                case "added":
                    setMessage("Tarefa adicionada");
                    break;
                case "completed":
                    setMessage("Tarefa concluída");
                    break;
                case "deleted":
                    setMessage("Tarefa excluída");
                    break;
            }
            setShowToast(true);
        }
    }, [props.actionType]);

    useEffect(() => {
        if (showToast) {
            if (toastRef.current) {
                const toast = new BootstrapToast(toastRef.current);
                toast.show();

                setTimeout(() => setShowToast(false), 3000);
            }
        }
    }, [showToast]);

    return (
        <>
            {showToast && (
                <div
                    className="toast-container position-fixed"
                    style={{
                        top: "1rem",
                        right: "1rem",
                    }}
                >
                    <div
                        ref={toastRef}
                        className="toast row align-items-center justify-content-between"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        style={{
                            padding: "0 1rem",
                            backgroundColor: "#198754", // Background color for the toast box
                        }}
                    >
                        <div
                            className="toast-body"
                            style={{
                                color: "white",
                                flex: 1,
                                fontSize: "16px",
                                fontWeight: 600,
                                lineHeight: "20px",
                            }}
                        >
                            {message}
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                            onClick={() => setShowToast(false)}
                            style={{
                                color: "white",
                                backgroundColor: "transparent",
                            }}
                        ></button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Toast;
