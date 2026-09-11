export function ProjectMeta({ client, tags }: { client: string; tags: string[] }) {
  if (!client && tags.length === 0) return null;

  return (
    <p className="font-sans text-meta text-ink">
      {client && <span className="font-medium">{client} </span>}
      {tags.length > 0 && <span>| {tags.join(", ")}</span>}
    </p>
  );
}
