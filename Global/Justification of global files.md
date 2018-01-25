# Justification of global files such as global stylesheets
There are minimal design changes between pages, therefore having separate stylesheets for every page would result in a larger filesize of the site as a whole, wasted bandwidth and slower page loading due to less caching.

It is better to have a global stylesheet with all the styles that would be shared across the pages and then separate stylesheets for each page that needs its own specific styles.