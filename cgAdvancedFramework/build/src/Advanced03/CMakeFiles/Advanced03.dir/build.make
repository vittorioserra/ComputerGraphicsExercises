# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.25

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /var/lib/snapd/snap/cmake/1210/bin/cmake

# The command to remove a file.
RM = /var/lib/snapd/snap/cmake/1210/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/vserra/cg/cgAdvancedFramework

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/vserra/cg/cgAdvancedFramework/build

# Include any dependencies generated for this target.
include src/Advanced03/CMakeFiles/Advanced03.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include src/Advanced03/CMakeFiles/Advanced03.dir/compiler_depend.make

# Include the progress variables for this target.
include src/Advanced03/CMakeFiles/Advanced03.dir/progress.make

# Include the compile flags for this target's objects.
include src/Advanced03/CMakeFiles/Advanced03.dir/flags.make

src/Advanced03/CMakeFiles/Advanced03.dir/src/cg.cpp.o: src/Advanced03/CMakeFiles/Advanced03.dir/flags.make
src/Advanced03/CMakeFiles/Advanced03.dir/src/cg.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/Advanced03/src/cg.cpp
src/Advanced03/CMakeFiles/Advanced03.dir/src/cg.cpp.o: src/Advanced03/CMakeFiles/Advanced03.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object src/Advanced03/CMakeFiles/Advanced03.dir/src/cg.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03 && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/Advanced03/CMakeFiles/Advanced03.dir/src/cg.cpp.o -MF CMakeFiles/Advanced03.dir/src/cg.cpp.o.d -o CMakeFiles/Advanced03.dir/src/cg.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/Advanced03/src/cg.cpp

src/Advanced03/CMakeFiles/Advanced03.dir/src/cg.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/Advanced03.dir/src/cg.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03 && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/Advanced03/src/cg.cpp > CMakeFiles/Advanced03.dir/src/cg.cpp.i

src/Advanced03/CMakeFiles/Advanced03.dir/src/cg.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/Advanced03.dir/src/cg.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03 && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/Advanced03/src/cg.cpp -o CMakeFiles/Advanced03.dir/src/cg.cpp.s

src/Advanced03/CMakeFiles/Advanced03.dir/src/main.cpp.o: src/Advanced03/CMakeFiles/Advanced03.dir/flags.make
src/Advanced03/CMakeFiles/Advanced03.dir/src/main.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/Advanced03/src/main.cpp
src/Advanced03/CMakeFiles/Advanced03.dir/src/main.cpp.o: src/Advanced03/CMakeFiles/Advanced03.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object src/Advanced03/CMakeFiles/Advanced03.dir/src/main.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03 && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/Advanced03/CMakeFiles/Advanced03.dir/src/main.cpp.o -MF CMakeFiles/Advanced03.dir/src/main.cpp.o.d -o CMakeFiles/Advanced03.dir/src/main.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/Advanced03/src/main.cpp

src/Advanced03/CMakeFiles/Advanced03.dir/src/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/Advanced03.dir/src/main.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03 && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/Advanced03/src/main.cpp > CMakeFiles/Advanced03.dir/src/main.cpp.i

src/Advanced03/CMakeFiles/Advanced03.dir/src/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/Advanced03.dir/src/main.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03 && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/Advanced03/src/main.cpp -o CMakeFiles/Advanced03.dir/src/main.cpp.s

# Object files for target Advanced03
Advanced03_OBJECTS = \
"CMakeFiles/Advanced03.dir/src/cg.cpp.o" \
"CMakeFiles/Advanced03.dir/src/main.cpp.o"

# External object files for target Advanced03
Advanced03_EXTERNAL_OBJECTS =

/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: src/Advanced03/CMakeFiles/Advanced03.dir/src/cg.cpp.o
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: src/Advanced03/CMakeFiles/Advanced03.dir/src/main.cpp.o
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: src/Advanced03/CMakeFiles/Advanced03.dir/build.make
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libSDL2main.a
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libSDL2.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libOpenGL.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libGLX.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libGLU.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libGLEW.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libpng.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: src/libCG_Framework.a
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libSDL2main.a
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libSDL2.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libOpenGL.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libGLX.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libGLU.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libGLEW.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libpng.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: /usr/lib/libz.so
/home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03: src/Advanced03/CMakeFiles/Advanced03.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Linking CXX executable /home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03"
	cd /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03 && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/Advanced03.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
src/Advanced03/CMakeFiles/Advanced03.dir/build: /home/vserra/cg/cgAdvancedFramework/src/Advanced03/Advanced03
.PHONY : src/Advanced03/CMakeFiles/Advanced03.dir/build

src/Advanced03/CMakeFiles/Advanced03.dir/clean:
	cd /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03 && $(CMAKE_COMMAND) -P CMakeFiles/Advanced03.dir/cmake_clean.cmake
.PHONY : src/Advanced03/CMakeFiles/Advanced03.dir/clean

src/Advanced03/CMakeFiles/Advanced03.dir/depend:
	cd /home/vserra/cg/cgAdvancedFramework/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/vserra/cg/cgAdvancedFramework /home/vserra/cg/cgAdvancedFramework/src/Advanced03 /home/vserra/cg/cgAdvancedFramework/build /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03 /home/vserra/cg/cgAdvancedFramework/build/src/Advanced03/CMakeFiles/Advanced03.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : src/Advanced03/CMakeFiles/Advanced03.dir/depend

