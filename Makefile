SRC_DIR = src
TEST_DIR = test
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

JS_ENGINE ?= `which node nodejs`
COMPILER = ${JS_ENGINE} ${BUILD_DIR}/uglify.js --unsafe
POST_COMPILER = ${JS_ENGINE} ${BUILD_DIR}/post-compile.js

BASE_FILES = $(shell ${JS_ENGINE} ${BUILD_DIR}/get_modules.js ${BUILD_DIR}/data/modules.json ${SRC_DIR})

MODULES = ${BUILD_DIR}/data/intro.js\
	${BASE_FILES}\
	${BUILD_DIR}/data/outro.js

AH = ${DIST_DIR}/jquery-ajaxhooks.js
AH_MIN = ${DIST_DIR}/jquery-ajaxhooks.min.js

AH_VER = $(shell cat ${BUILD_DIR}/data/version.txt)
VER = sed "s/@VERSION/${AH_VER}/"

DATE=$(shell git log -1 --pretty=format:%ad)

all: update_submodules core

core: ajaxHooks min lint
	@@echo "jQuery ajaxHooks build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}
	
ajaxHooks: ${AH}

${AH}: ${MODULES} | ${DIST_DIR}
	@@echo "Building" ${AH}

	@@cat ${MODULES} | \
		sed 's/.function..jQuery...{//' | \
		sed 's/}...jQuery..;//' | \
		sed 's/@DATE/'"${DATE}"'/' | \
		${VER} > ${AH};

lint: ajaxHooks
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Checking jQuery ajaxHooks against JSLint..."; \
		${JS_ENGINE} build/jslint-check.js; \
	else \
		echo "You must have NodeJS installed in order to test jQuery ajaxHooks against JSLint."; \
	fi

min: ajaxHooks ${AH_MIN}

${AH_MIN}: ${AH}
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Minifying jQuery ajaxHooks" ${AH_MIN}; \
		${COMPILER} ${AH} > ${AH_MIN}.tmp; \
		${POST_COMPILER} ${AH_MIN}.tmp > ${AH_MIN}; \
		rm -f ${AH_MIN}.tmp; \
	else \
		echo "You must have NodeJS installed in order to minify jQuery ajaxHooks."; \
	fi
	

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

distclean: clean
	@@echo "Removing submodules"
	@@rm -rf test/qunit

# change pointers for submodules and update them to what is specified in ajaxHooks
# --merge  doesn't work when doing an initial clone, thus test if we have non-existing
#  submodules, then do an real update
update_submodules:
	@@if [ -d .git ]; then \
		if git submodule status | grep -q -E '^-'; then \
			git submodule update --init --recursive; \
		else \
			git submodule update --init --recursive --merge; \
		fi; \
	fi;

# update the submodules to the latest at the most logical branch
pull_submodules:
	@@git submodule foreach "git pull \$$(git config remote.origin.url)"
	@@git submodule summary

pull: pull_submodules
	@@git pull ${REMOTE} ${BRANCH}

.PHONY: all ajaxHooks lint min clean distclean update_submodules pull_submodules pull core
