# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.24

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
CMAKE_COMMAND = /var/lib/snapd/snap/cmake/1186/bin/cmake

# The command to remove a file.
RM = /var/lib/snapd/snap/cmake/1186/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/vserra/cg/cgAdvancedFramework/deps/SDL2-2.0.12

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/vserra/cg/cgAdvancedFramework/deps/SDL2-2.0.12/build

# Utility rule file for uninstall.

# Include any custom commands dependencies for this target.
include CMakeFiles/uninstall.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/uninstall.dir/progress.make

CMakeFiles/uninstall:
	/var/lib/snapd/snap/cmake/1186/bin/cmake -P /home/vserra/cg/cgAdvancedFramework/deps/SDL2-2.0.12/build/cmake_uninstall.cmake

uninstall: CMakeFiles/uninstall
uninstall: CMakeFiles/uninstall.dir/build.make
.PHONY : uninstall

# Rule to build all files generated by this target.
CMakeFiles/uninstall.dir/build: uninstall
.PHONY : CMakeFiles/uninstall.dir/build

CMakeFiles/uninstall.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/uninstall.dir/cmake_clean.cmake
.PHONY : CMakeFiles/uninstall.dir/clean

CMakeFiles/uninstall.dir/depend:
	cd /home/vserra/cg/cgAdvancedFramework/deps/SDL2-2.0.12/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/vserra/cg/cgAdvancedFramework/deps/SDL2-2.0.12 /home/vserra/cg/cgAdvancedFramework/deps/SDL2-2.0.12 /home/vserra/cg/cgAdvancedFramework/deps/SDL2-2.0.12/build /home/vserra/cg/cgAdvancedFramework/deps/SDL2-2.0.12/build /home/vserra/cg/cgAdvancedFramework/deps/SDL2-2.0.12/build/CMakeFiles/uninstall.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/uninstall.dir/depend
