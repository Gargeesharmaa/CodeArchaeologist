from pydantic import BaseModel


class Issue(BaseModel):
    title: str
    severity: str
    file: str
    line: int
    description: str
    recommendation: str


class ArchitectureResult(BaseModel):
    summary: str
    architecture_pattern: str
    entry_points: list[str]
    important_modules: list[str]


class DependencyResult(BaseModel):
    external_dependencies: list[str]
    internal_dependencies: list[str]
    circular_dependencies: list[str]
    highly_coupled_modules: list[str]


class SecurityResult(BaseModel):
    security_score: float
    issues: list[Issue]


class DocumentationResult(BaseModel):
    readme_score: float
    missing_sections: list[str]
    undocumented_modules: list[str]


class RefactorResult(BaseModel):
    complexity_score: float
    code_smells: list[Issue]