import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: About,
})

function About(){

    return (
        <p>About page</p>
    )
}