export interface LoginCredentials {
    email: string;
    senha: string;
}

export async function login(credentials: LoginCredentials) {
    const response = await fetch(
        "https://n8n-host.dev-systems.org/webhook/usuario",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao realizar login");
    }

    return response.json();
}
