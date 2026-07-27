import ast
from pathlib import Path


IGNORE_DIRS = {
    ".git",
    ".github",
    "__pycache__",
    "node_modules",
    "venv",
    ".venv",
    "dist",
    "build",
    ".idea",
    ".vscode",
    ".next",
    "coverage",
}

SUPPORTED_EXTENSIONS = {
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".java",
    ".cpp",
    ".c",
    ".cs",
    ".go",
    ".rs",
    ".php",
    ".html",
    ".css",
    ".json",
    ".md",
    ".yaml",
    ".yml",
    ".toml",
}


class ParserService:

    def parse_repository(self, repo_path: Path) -> list[dict]:
        """
        Parse all supported files inside a repository.
        """

        parsed_files = []

        for file_path in repo_path.rglob("*"):

            if self._should_ignore(file_path):
                continue

            parsed_file = self._parse_file(file_path, repo_path)

            if parsed_file:
                parsed_files.append(parsed_file)

        return parsed_files

    def _should_ignore(self, file_path: Path) -> bool:
        """
        Ignore unwanted directories and unsupported files.
        """

        if any(part in IGNORE_DIRS for part in file_path.parts):
            return True

        if not file_path.is_file():
            return True

        if file_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            return True

        return False

    def _parse_file(self, file_path: Path, repo_path: Path) -> dict | None:
        """
        Read a single file and extract metadata.
        """

        try:
            content = file_path.read_text(
                encoding="utf-8",
                errors="ignore"
            )

        except Exception:
            return None

        metadata = self._extract_metadata(
            content,
            file_path.suffix.lower()
        )

        return {
            "path": str(file_path.relative_to(repo_path)),
            "name": file_path.name,
            "extension": file_path.suffix.lower(),
            "size": file_path.stat().st_size,
            "lines": len(content.splitlines()),
            "content": content,
            "metadata": metadata,
        }

    def _extract_metadata(
        self,
        content: str,
        extension: str,
    ) -> dict:
        """
        Extract language-specific metadata.
        """

        if extension == ".py":
            return self._extract_python_metadata(content)

        return {
            "classes": [],
            "functions": [],
            "imports": [],
        }

    def _extract_python_metadata(
        self,
        content: str,
    ) -> dict:

        metadata = {
            "classes": [],
            "functions": [],
            "imports": [],
        }

        try:
            tree = ast.parse(content)

        except SyntaxError:
            return metadata

        for node in ast.walk(tree):

            if isinstance(node, ast.ClassDef):
                metadata["classes"].append(node.name)

            elif isinstance(node, ast.FunctionDef):
                metadata["functions"].append(node.name)

            elif isinstance(node, ast.AsyncFunctionDef):
                metadata["functions"].append(node.name)

            elif isinstance(node, ast.Import):

                for module in node.names:
                    metadata["imports"].append(module.name)

            elif isinstance(node, ast.ImportFrom):

                if node.module:
                    metadata["imports"].append(node.module)

        return metadata