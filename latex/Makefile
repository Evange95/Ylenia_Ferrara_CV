.PHONY: all en it clean

all: en it

en: cv_en.pdf
it: cv_it.pdf

cv_en.pdf: cv_en.tex $(wildcard cv_en/*.tex) awesome-cv.cls
	xelatex -interaction=nonstopmode cv_en.tex
	xelatex -interaction=nonstopmode cv_en.tex

cv_it.pdf: cv_it.tex $(wildcard cv_it/*.tex) awesome-cv.cls
	xelatex -interaction=nonstopmode cv_it.tex
	xelatex -interaction=nonstopmode cv_it.tex

clean:
	rm -f *.aux *.log *.out *.pdf
