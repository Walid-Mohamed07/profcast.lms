interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Disable right-click context menu
  };

  return (
    <div
      style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}
      onContextMenu={handleContextMenu}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?disablekb=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '4px',
        }}
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
