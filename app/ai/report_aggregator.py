from typing import Dict, List


class ReportAggregator:

    @staticmethod
    def aggregate(state) -> Dict:

        architecture = state["architecture"].model_dump()
        dependency = state["dependency"].model_dump()
        security = state["security"].model_dump()
        documentation = state["documentation"].model_dump()
        refactor = state["refactor"].model_dump()

        scores = []

        if "security_score" in security:
            scores.append(security["security_score"])

        if "readme_score" in documentation:
            scores.append(documentation["readme_score"])

        if "complexity_score" in refactor:
            scores.append(refactor["complexity_score"])

        overall_score = (
            round(sum(scores) / len(scores), 2)
            if scores else 0
        )

        top_issues: List[Dict] = []

        top_issues.extend(security.get("issues", []))
        top_issues.extend(refactor.get("code_smells", []))

        return {
            "overall_score": overall_score,
            "architecture": architecture,
            "dependency": dependency,
            "security": security,
            "documentation": documentation,
            "refactor": refactor,
            "top_issues": top_issues
        }