import { Outlet, Navigate } from "react-router-dom";

import { SideNavAdmin } from "../../components";
import { Container } from "./styles";

export function AdminLayout() {
    const raw = localStorage.getItem("devburguer:userData");
    const userData = raw ? JSON.parse(raw) : null;

    const isAdmin =
        userData?.admin === true ||
        userData?.admin === "true" ||
        userData?.role === "admin";

    return isAdmin ?
        (
            <Container>
                <SideNavAdmin />
                <main>
                    <section>
                        <Outlet />
                    </section>
                </main>

            </Container>
        ) : (
            <Navigate to="/login" replace />
        );
}