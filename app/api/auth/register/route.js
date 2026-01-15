// Next.js API route to proxy registration requests to the backend
export async function POST(request) {
    try {
        const body = await request.json();

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return Response.json(data, { status: response.status });
    } catch (error) {
        return Response.json(
            { message: 'Server error. Please try again.' },
            { status: 500 }
        );
    }
}
