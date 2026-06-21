.PHONY: all en it clean

BUILD = build

all: en it

en: cv_en.pdf
it: cv_it.pdf

cv_en.pdf: cv_en.tex $(wildcard cv_en/*.tex) awesome-cv.cls
	@mkdir -p $(BUILD)
	xelatex -interaction=nonstopmode -output-directory=$(BUILD) cv_en.tex
	xelatex -interaction=nonstopmode -output-directory=$(BUILD) cv_en.tex
	cp $(BUILD)/cv_en.pdf .

cv_it.pdf: cv_it.tex $(wildcard cv_it/*.tex) awesome-cv.cls
	@mkdir -p $(BUILD)
	xelatex -interaction=nonstopmode -output-directory=$(BUILD) cv_it.tex
	xelatex -interaction=nonstopmode -output-directory=$(BUILD) cv_it.tex
	cp $(BUILD)/cv_it.pdf .

clean:
	rm -rf $(BUILD) cv_en.pdf cv_it.pdf
