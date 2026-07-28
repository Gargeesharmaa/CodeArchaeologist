import shutil
import time
from pathlib import Path
from uuid import uuid4
from git import Repo, GitCommandError
import sys
from pathlib import Path

# Add the project root folder to Python's search path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))
from app.core.config import settings

class GitService:
    def __init__(self):
        self.base_path=Path(settings.TEMP_REPO_DIR)
        self.base_path.mkdir(exist_ok=True)

    def clone_repository(self, repo_url : str, branch: str="main")-> Path:
        repo_name = f"{uuid4().hex}"
        clone_path = self.base_path / repo_name

        try:
            Repo.clone_from(
                repo_url,
                clone_path,
                branch= branch,
                depth=1
            )
            return clone_path
        except GitCommandError as e:
            raise Exception(f"Failed to clone repository: {e}")

    def delete_repository(self, repo_path: Path):
        time.sleep(1)
        shutil.rmtree(repo_path, ignore_errors=True)
