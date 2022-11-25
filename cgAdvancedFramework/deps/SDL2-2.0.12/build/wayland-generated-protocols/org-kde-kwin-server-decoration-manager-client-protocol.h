/* Generated by wayland-scanner 1.21.0 */

#ifndef SERVER_DECORATION_CLIENT_PROTOCOL_H
#define SERVER_DECORATION_CLIENT_PROTOCOL_H

#include <stdint.h>
#include <stddef.h>
#include "wayland-client.h"

#ifdef  __cplusplus
extern "C" {
#endif

/**
 * @page page_server_decoration The server_decoration protocol
 * @section page_ifaces_server_decoration Interfaces
 * - @subpage page_iface_org_kde_kwin_server_decoration_manager - Server side window decoration manager
 * - @subpage page_iface_org_kde_kwin_server_decoration - 
 * @section page_copyright_server_decoration Copyright
 * <pre>
 *
 * Copyright (C) 2015 Martin Gräßlin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * </pre>
 */
struct org_kde_kwin_server_decoration;
struct org_kde_kwin_server_decoration_manager;
struct wl_surface;

#ifndef ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_INTERFACE
#define ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_INTERFACE
/**
 * @page page_iface_org_kde_kwin_server_decoration_manager org_kde_kwin_server_decoration_manager
 * @section page_iface_org_kde_kwin_server_decoration_manager_desc Description
 *
 * This interface allows to coordinate whether the server should create
 * a server-side window decoration around a wl_surface representing a
 * shell surface (wl_shell_surface or similar). By announcing support
 * for this interface the server indicates that it supports server
 * side decorations.
 * @section page_iface_org_kde_kwin_server_decoration_manager_api API
 * See @ref iface_org_kde_kwin_server_decoration_manager.
 */
/**
 * @defgroup iface_org_kde_kwin_server_decoration_manager The org_kde_kwin_server_decoration_manager interface
 *
 * This interface allows to coordinate whether the server should create
 * a server-side window decoration around a wl_surface representing a
 * shell surface (wl_shell_surface or similar). By announcing support
 * for this interface the server indicates that it supports server
 * side decorations.
 */
extern const struct wl_interface org_kde_kwin_server_decoration_manager_interface;
#endif
#ifndef ORG_KDE_KWIN_SERVER_DECORATION_INTERFACE
#define ORG_KDE_KWIN_SERVER_DECORATION_INTERFACE
/**
 * @page page_iface_org_kde_kwin_server_decoration org_kde_kwin_server_decoration
 * @section page_iface_org_kde_kwin_server_decoration_api API
 * See @ref iface_org_kde_kwin_server_decoration.
 */
/**
 * @defgroup iface_org_kde_kwin_server_decoration The org_kde_kwin_server_decoration interface
 */
extern const struct wl_interface org_kde_kwin_server_decoration_interface;
#endif

#ifndef ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_MODE_ENUM
#define ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_MODE_ENUM
/**
 * @ingroup iface_org_kde_kwin_server_decoration_manager
 * Possible values to use in request_mode and the event mode.
 */
enum org_kde_kwin_server_decoration_manager_mode {
	/**
	 * Undecorated: The surface is not decorated at all, neither server nor client-side. An example is a popup surface which should not be decorated.
	 */
	ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_MODE_NONE = 0,
	/**
	 * Client-side decoration: The decoration is part of the surface and the client.
	 */
	ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_MODE_CLIENT = 1,
	/**
	 * Server-side decoration: The server embeds the surface into a decoration frame.
	 */
	ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_MODE_SERVER = 2,
};
#endif /* ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_MODE_ENUM */

/**
 * @ingroup iface_org_kde_kwin_server_decoration_manager
 * @struct org_kde_kwin_server_decoration_manager_listener
 */
struct org_kde_kwin_server_decoration_manager_listener {
	/**
	 * The default mode used on the server
	 *
	 * This event is emitted directly after binding the interface. It
	 * contains the default mode for the decoration. When a new server
	 * decoration object is created this new object will be in the
	 * default mode until the first request_mode is requested.
	 *
	 * The server may change the default mode at any time.
	 * @param mode The default decoration mode applied to newly created server decorations.
	 */
	void (*default_mode)(void *data,
			     struct org_kde_kwin_server_decoration_manager *org_kde_kwin_server_decoration_manager,
			     uint32_t mode);
};

/**
 * @ingroup iface_org_kde_kwin_server_decoration_manager
 */
static inline int
org_kde_kwin_server_decoration_manager_add_listener(struct org_kde_kwin_server_decoration_manager *org_kde_kwin_server_decoration_manager,
						    const struct org_kde_kwin_server_decoration_manager_listener *listener, void *data)
{
	return wl_proxy_add_listener((struct wl_proxy *) org_kde_kwin_server_decoration_manager,
				     (void (**)(void)) listener, data);
}

#define ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_CREATE 0

/**
 * @ingroup iface_org_kde_kwin_server_decoration_manager
 */
#define ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_DEFAULT_MODE_SINCE_VERSION 1

/**
 * @ingroup iface_org_kde_kwin_server_decoration_manager
 */
#define ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_CREATE_SINCE_VERSION 1

/** @ingroup iface_org_kde_kwin_server_decoration_manager */
static inline void
org_kde_kwin_server_decoration_manager_set_user_data(struct org_kde_kwin_server_decoration_manager *org_kde_kwin_server_decoration_manager, void *user_data)
{
	wl_proxy_set_user_data((struct wl_proxy *) org_kde_kwin_server_decoration_manager, user_data);
}

/** @ingroup iface_org_kde_kwin_server_decoration_manager */
static inline void *
org_kde_kwin_server_decoration_manager_get_user_data(struct org_kde_kwin_server_decoration_manager *org_kde_kwin_server_decoration_manager)
{
	return wl_proxy_get_user_data((struct wl_proxy *) org_kde_kwin_server_decoration_manager);
}

static inline uint32_t
org_kde_kwin_server_decoration_manager_get_version(struct org_kde_kwin_server_decoration_manager *org_kde_kwin_server_decoration_manager)
{
	return wl_proxy_get_version((struct wl_proxy *) org_kde_kwin_server_decoration_manager);
}

/** @ingroup iface_org_kde_kwin_server_decoration_manager */
static inline void
org_kde_kwin_server_decoration_manager_destroy(struct org_kde_kwin_server_decoration_manager *org_kde_kwin_server_decoration_manager)
{
	wl_proxy_destroy((struct wl_proxy *) org_kde_kwin_server_decoration_manager);
}

/**
 * @ingroup iface_org_kde_kwin_server_decoration_manager
 *
 * When a client creates a server-side decoration object it indicates
 * that it supports the protocol. The client is supposed to tell the
 * server whether it wants server-side decorations or will provide
 * client-side decorations.
 *
 * If the client does not create a server-side decoration object for
 * a surface the server interprets this as lack of support for this
 * protocol and considers it as client-side decorated. Nevertheless a
 * client-side decorated surface should use this protocol to indicate
 * to the server that it does not want a server-side deco.
 */
static inline struct org_kde_kwin_server_decoration *
org_kde_kwin_server_decoration_manager_create(struct org_kde_kwin_server_decoration_manager *org_kde_kwin_server_decoration_manager, struct wl_surface *surface)
{
	struct wl_proxy *id;

	id = wl_proxy_marshal_flags((struct wl_proxy *) org_kde_kwin_server_decoration_manager,
			 ORG_KDE_KWIN_SERVER_DECORATION_MANAGER_CREATE, &org_kde_kwin_server_decoration_interface, wl_proxy_get_version((struct wl_proxy *) org_kde_kwin_server_decoration_manager), 0, NULL, surface);

	return (struct org_kde_kwin_server_decoration *) id;
}

#ifndef ORG_KDE_KWIN_SERVER_DECORATION_MODE_ENUM
#define ORG_KDE_KWIN_SERVER_DECORATION_MODE_ENUM
/**
 * @ingroup iface_org_kde_kwin_server_decoration
 * Possible values to use in request_mode and the event mode.
 */
enum org_kde_kwin_server_decoration_mode {
	/**
	 * Undecorated: The surface is not decorated at all, neither server nor client-side. An example is a popup surface which should not be decorated.
	 */
	ORG_KDE_KWIN_SERVER_DECORATION_MODE_NONE = 0,
	/**
	 * Client-side decoration: The decoration is part of the surface and the client.
	 */
	ORG_KDE_KWIN_SERVER_DECORATION_MODE_CLIENT = 1,
	/**
	 * Server-side decoration: The server embeds the surface into a decoration frame.
	 */
	ORG_KDE_KWIN_SERVER_DECORATION_MODE_SERVER = 2,
};
#endif /* ORG_KDE_KWIN_SERVER_DECORATION_MODE_ENUM */

/**
 * @ingroup iface_org_kde_kwin_server_decoration
 * @struct org_kde_kwin_server_decoration_listener
 */
struct org_kde_kwin_server_decoration_listener {
	/**
	 * The new decoration mode applied by the server
	 *
	 * This event is emitted directly after the decoration is created
	 * and represents the base decoration policy by the server. E.g. a
	 * server which wants all surfaces to be client-side decorated will
	 * send Client, a server which wants server-side decoration will
	 * send Server.
	 *
	 * The client can request a different mode through the decoration
	 * request. The server will acknowledge this by another event with
	 * the same mode. So even if a server prefers server-side
	 * decoration it's possible to force a client-side decoration.
	 *
	 * The server may emit this event at any time. In this case the
	 * client can again request a different mode. It's the
	 * responsibility of the server to prevent a feedback loop.
	 * @param mode The decoration mode applied to the surface by the server.
	 */
	void (*mode)(void *data,
		     struct org_kde_kwin_server_decoration *org_kde_kwin_server_decoration,
		     uint32_t mode);
};

/**
 * @ingroup iface_org_kde_kwin_server_decoration
 */
static inline int
org_kde_kwin_server_decoration_add_listener(struct org_kde_kwin_server_decoration *org_kde_kwin_server_decoration,
					    const struct org_kde_kwin_server_decoration_listener *listener, void *data)
{
	return wl_proxy_add_listener((struct wl_proxy *) org_kde_kwin_server_decoration,
				     (void (**)(void)) listener, data);
}

#define ORG_KDE_KWIN_SERVER_DECORATION_RELEASE 0
#define ORG_KDE_KWIN_SERVER_DECORATION_REQUEST_MODE 1

/**
 * @ingroup iface_org_kde_kwin_server_decoration
 */
#define ORG_KDE_KWIN_SERVER_DECORATION_MODE_SINCE_VERSION 1

/**
 * @ingroup iface_org_kde_kwin_server_decoration
 */
#define ORG_KDE_KWIN_SERVER_DECORATION_RELEASE_SINCE_VERSION 1
/**
 * @ingroup iface_org_kde_kwin_server_decoration
 */
#define ORG_KDE_KWIN_SERVER_DECORATION_REQUEST_MODE_SINCE_VERSION 1

/** @ingroup iface_org_kde_kwin_server_decoration */
static inline void
org_kde_kwin_server_decoration_set_user_data(struct org_kde_kwin_server_decoration *org_kde_kwin_server_decoration, void *user_data)
{
	wl_proxy_set_user_data((struct wl_proxy *) org_kde_kwin_server_decoration, user_data);
}

/** @ingroup iface_org_kde_kwin_server_decoration */
static inline void *
org_kde_kwin_server_decoration_get_user_data(struct org_kde_kwin_server_decoration *org_kde_kwin_server_decoration)
{
	return wl_proxy_get_user_data((struct wl_proxy *) org_kde_kwin_server_decoration);
}

static inline uint32_t
org_kde_kwin_server_decoration_get_version(struct org_kde_kwin_server_decoration *org_kde_kwin_server_decoration)
{
	return wl_proxy_get_version((struct wl_proxy *) org_kde_kwin_server_decoration);
}

/** @ingroup iface_org_kde_kwin_server_decoration */
static inline void
org_kde_kwin_server_decoration_destroy(struct org_kde_kwin_server_decoration *org_kde_kwin_server_decoration)
{
	wl_proxy_destroy((struct wl_proxy *) org_kde_kwin_server_decoration);
}

/**
 * @ingroup iface_org_kde_kwin_server_decoration
 */
static inline void
org_kde_kwin_server_decoration_release(struct org_kde_kwin_server_decoration *org_kde_kwin_server_decoration)
{
	wl_proxy_marshal_flags((struct wl_proxy *) org_kde_kwin_server_decoration,
			 ORG_KDE_KWIN_SERVER_DECORATION_RELEASE, NULL, wl_proxy_get_version((struct wl_proxy *) org_kde_kwin_server_decoration), WL_MARSHAL_FLAG_DESTROY);
}

/**
 * @ingroup iface_org_kde_kwin_server_decoration
 */
static inline void
org_kde_kwin_server_decoration_request_mode(struct org_kde_kwin_server_decoration *org_kde_kwin_server_decoration, uint32_t mode)
{
	wl_proxy_marshal_flags((struct wl_proxy *) org_kde_kwin_server_decoration,
			 ORG_KDE_KWIN_SERVER_DECORATION_REQUEST_MODE, NULL, wl_proxy_get_version((struct wl_proxy *) org_kde_kwin_server_decoration), 0, mode);
}

#ifdef  __cplusplus
}
#endif

#endif
