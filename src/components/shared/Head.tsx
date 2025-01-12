import { Helmet } from "react-helmet-async";

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
}

export const Head = ({
  title = "Inspire Institute of Science and Technology,Bihar",
  description = "",
  image = "",
}: HeadProps) => {
  // Convert relative URLs to absolute URLs
  const absoluteImageUrl =
    image && !image.startsWith("http")
      ? `${window.location.origin}${image}`
      : image;

  return (
    <Helmet key={window.location.href}>
      {/* HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {absoluteImageUrl && (
        <meta property="og:image" content={absoluteImageUrl} />
      )}

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={window.location.hostname} />
      <meta property="twitter:url" content={window.location.href} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absoluteImageUrl && (
        <meta name="twitter:image" content={absoluteImageUrl} />
      )}
    </Helmet>
  );
};
