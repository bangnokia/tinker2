export default function SnippetsPanel() {
    const snippets = [
        {
            id: 1,
            content: `User::first();`
        },
        {
            id: 2,
            content: `foreach (range(1, 10) as $item) { 
            echo $item; 
            }`
        }
    ]

    return (
        <div>
            {snippets.map(function(snippet) {
                return (
                    <li>
                        <pre>{snippet.content}</pre>
                    </li>
                )
            })}

        </div>
    );
}
