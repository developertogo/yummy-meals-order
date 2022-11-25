import { RefineKbar } from "@pankod/refine-kbar";
import { ArrowLeftOutlined } from "@mui/icons-material";

import "./style.css";

export const OffLayoutArea: React.FC = () => {
    return (
        <>
            <RefineKbar />
            <div className="toggle-container">
                <ArrowLeftOutlined
                    className="icon"
                    sx={{
                        fontSize: "3rem",
                    }}
                />
                <a href="https://example.refine.dev">
                    Switch to <br />
                    <strong>CLIENT APP</strong>
                </a>
            </div>
        </>
    );
};
