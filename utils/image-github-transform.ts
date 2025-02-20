interface ImageGithubTransformProps {
  src: string;
  username: string;
  repo: string;
  branch?: string;
}

// Transform relative image URLs to absolute GitHub URLs
export const transformImageUri = ({
  src,
  username,
  repo,
  branch = "main",
}: ImageGithubTransformProps) => {
  if (src.startsWith("http")) {
    return src;
  }

  // Handle relative paths
  if (src.startsWith("./") || src.startsWith("../")) {
    src = src.replace(/^[./]+/, "");
  }

  return `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${src}`;
};
