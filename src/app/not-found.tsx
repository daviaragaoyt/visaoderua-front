import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container size="md" className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-display text-display-2xl text-outline">404</span>
      <h1 className="mt-2 font-display text-display-sm uppercase text-foreground">Essa rua não existe</h1>
      <p className="mt-3 max-w-md text-muted">A página que você procurou não foi encontrada. Bora voltar pro arsenal.</p>
      <ButtonLink href="/" className="mt-8">
        Voltar pra loja
      </ButtonLink>
    </Container>
  );
}
