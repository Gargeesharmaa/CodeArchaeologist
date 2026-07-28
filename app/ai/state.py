from typing import Annotated, TypedDict
import operator


class CodeAnalysisState(TypedDict):

    context: dict

    architecture: dict

    dependency: dict

    security: dict

    documentation: dict

    refactor: dict

    errors: Annotated[list, operator.add] 